import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ITeacher, Teacher } from '../teacher.model';
import { TeacherService } from '../service/teacher.service';

@Component({
  selector: 'jhi-teacher-update',
  templateUrl: './teacher-update.component.html',
})
export class TeacherUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    fullName: [],
    email: [],
    phone: [],
    status: [],
    avatar: [],
    createDate: [],
    createName: [],
    updateDate: [],
    updateName: [],
  });

  constructor(protected teacherService: TeacherService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teacher }) => {
      if (teacher.id === undefined) {
        const today = dayjs().startOf('day');
        teacher.createDate = today;
        teacher.updateDate = today;
      }

      this.updateForm(teacher);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teacher = this.createFromForm();
    if (teacher.id !== undefined) {
      this.subscribeToSaveResponse(this.teacherService.update(teacher));
    } else {
      this.subscribeToSaveResponse(this.teacherService.create(teacher));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>): void {
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

  protected updateForm(teacher: ITeacher): void {
    this.editForm.patchValue({
      id: teacher.id,
      code: teacher.code,
      fullName: teacher.fullName,
      email: teacher.email,
      phone: teacher.phone,
      status: teacher.status,
      avatar: teacher.avatar,
      createDate: teacher.createDate ? teacher.createDate.format(DATE_TIME_FORMAT) : null,
      createName: teacher.createName,
      updateDate: teacher.updateDate ? teacher.updateDate.format(DATE_TIME_FORMAT) : null,
      updateName: teacher.updateName,
    });
  }

  protected createFromForm(): ITeacher {
    return {
      ...new Teacher(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      fullName: this.editForm.get(['fullName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      status: this.editForm.get(['status'])!.value,
      avatar: this.editForm.get(['avatar'])!.value,
      createDate: this.editForm.get(['createDate'])!.value ? dayjs(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      createName: this.editForm.get(['createName'])!.value,
      updateDate: this.editForm.get(['updateDate'])!.value ? dayjs(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateName: this.editForm.get(['updateName'])!.value,
    };
  }
}
