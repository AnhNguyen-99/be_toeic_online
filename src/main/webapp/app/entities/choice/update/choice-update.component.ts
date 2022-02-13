import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IChoice, Choice } from '../choice.model';
import { ChoiceService } from '../service/choice.service';

@Component({
  selector: 'jhi-choice-update',
  templateUrl: './choice-update.component.html',
})
export class ChoiceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    questionId: [],
    choiceText: [],
    corrected: [],
  });

  constructor(protected choiceService: ChoiceService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ choice }) => {
      this.updateForm(choice);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const choice = this.createFromForm();
    if (choice.id !== undefined) {
      this.subscribeToSaveResponse(this.choiceService.update(choice));
    } else {
      this.subscribeToSaveResponse(this.choiceService.create(choice));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChoice>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(choice: IChoice): void {
    this.editForm.patchValue({
      id: choice.id,
      questionId: choice.questionId,
      choiceText: choice.choiceText,
      corrected: choice.corrected,
    });
  }

  protected createFromForm(): IChoice {
    return {
      ...new Choice(),
      id: this.editForm.get(['id'])!.value,
      questionId: this.editForm.get(['questionId'])!.value,
      choiceText: this.editForm.get(['choiceText'])!.value,
      corrected: this.editForm.get(['corrected'])!.value,
    };
  }
}
