import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IStudent, Student } from '../student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html',
})
export class StudentUpdateComponent implements OnInit {
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

  constructor(protected studentService: StudentService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      if (student.id === undefined) {
        const today = dayjs().startOf('day');
        student.createDate = today;
        student.updateDate = today;
      }

      this.updateForm(student);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
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

  protected updateForm(student: IStudent): void {
    this.editForm.patchValue({
      id: student.id,
      code: student.code,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      status: student.status,
      avatar: student.avatar,
      createDate: student.createDate ? student.createDate.format(DATE_TIME_FORMAT) : null,
      createName: student.createName,
      updateDate: student.updateDate ? student.updateDate.format(DATE_TIME_FORMAT) : null,
      updateName: student.updateName,
    });
  }

  protected createFromForm(): IStudent {
    return {
      ...new Student(),
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
