import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISubject, Subject } from '../subject.model';
import { SubjectService } from '../service/subject.service';

@Component({
  selector: 'jhi-subject-update',
  templateUrl: './subject-update.component.html',
})
export class SubjectUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    classCode: [],
    status: [],
    createDate: [],
    createName: [],
    updateDate: [],
    updateName: [],
  });

  constructor(protected subjectService: SubjectService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subject }) => {
      if (subject.id === undefined) {
        const today = dayjs().startOf('day');
        subject.createDate = today;
        subject.updateDate = today;
      }

      this.updateForm(subject);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subject = this.createFromForm();
    if (subject.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectService.update(subject));
    } else {
      this.subscribeToSaveResponse(this.subjectService.create(subject));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>): void {
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

  protected updateForm(subject: ISubject): void {
    this.editForm.patchValue({
      id: subject.id,
      code: subject.code,
      name: subject.name,
      classCode: subject.classCode,
      status: subject.status,
      createDate: subject.createDate ? subject.createDate.format(DATE_TIME_FORMAT) : null,
      createName: subject.createName,
      updateDate: subject.updateDate ? subject.updateDate.format(DATE_TIME_FORMAT) : null,
      updateName: subject.updateName,
    });
  }

  protected createFromForm(): ISubject {
    return {
      ...new Subject(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      classCode: this.editForm.get(['classCode'])!.value,
      status: this.editForm.get(['status'])!.value,
      createDate: this.editForm.get(['createDate'])!.value ? dayjs(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      createName: this.editForm.get(['createName'])!.value,
      updateDate: this.editForm.get(['updateDate'])!.value ? dayjs(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateName: this.editForm.get(['updateName'])!.value,
    };
  }
}
