import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITypeQuestion, TypeQuestion } from '../type-question.model';
import { TypeQuestionService } from '../service/type-question.service';

@Component({
  selector: 'jhi-type-question-update',
  templateUrl: './type-question-update.component.html',
})
export class TypeQuestionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
  });

  constructor(protected typeQuestionService: TypeQuestionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeQuestion }) => {
      this.updateForm(typeQuestion);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeQuestion = this.createFromForm();
    if (typeQuestion.id !== undefined) {
      this.subscribeToSaveResponse(this.typeQuestionService.update(typeQuestion));
    } else {
      this.subscribeToSaveResponse(this.typeQuestionService.create(typeQuestion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeQuestion>>): void {
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

  protected updateForm(typeQuestion: ITypeQuestion): void {
    this.editForm.patchValue({
      id: typeQuestion.id,
      code: typeQuestion.code,
      name: typeQuestion.name,
    });
  }

  protected createFromForm(): ITypeQuestion {
    return {
      ...new TypeQuestion(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
