import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITypeExam, TypeExam } from '../type-exam.model';
import { TypeExamService } from '../service/type-exam.service';

@Component({
  selector: 'jhi-type-exam-update',
  templateUrl: './type-exam-update.component.html',
})
export class TypeExamUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
  });

  constructor(protected typeExamService: TypeExamService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeExam }) => {
      this.updateForm(typeExam);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeExam = this.createFromForm();
    if (typeExam.id !== undefined) {
      this.subscribeToSaveResponse(this.typeExamService.update(typeExam));
    } else {
      this.subscribeToSaveResponse(this.typeExamService.create(typeExam));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeExam>>): void {
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

  protected updateForm(typeExam: ITypeExam): void {
    this.editForm.patchValue({
      id: typeExam.id,
      code: typeExam.code,
      name: typeExam.name,
    });
  }

  protected createFromForm(): ITypeExam {
    return {
      ...new TypeExam(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
