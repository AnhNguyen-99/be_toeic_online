import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IClassroom, Classroom } from '../classroom.model';
import { ClassroomService } from '../service/classroom.service';

@Component({
  selector: 'jhi-classroom-update',
  templateUrl: './classroom-update.component.html',
})
export class ClassroomUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    teacherCode: [],
    status: [],
    avatar: [],
    createDate: [],
    createName: [],
    updateDate: [],
    updateName: [],
  });

  constructor(protected classroomService: ClassroomService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroom }) => {
      if (classroom.id === undefined) {
        const today = dayjs().startOf('day');
        classroom.createDate = today;
        classroom.updateDate = today;
      }

      this.updateForm(classroom);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classroom = this.createFromForm();
    if (classroom.id !== undefined) {
      this.subscribeToSaveResponse(this.classroomService.update(classroom));
    } else {
      this.subscribeToSaveResponse(this.classroomService.create(classroom));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassroom>>): void {
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

  protected updateForm(classroom: IClassroom): void {
    this.editForm.patchValue({
      id: classroom.id,
      code: classroom.code,
      name: classroom.name,
      teacherCode: classroom.teacherCode,
      status: classroom.status,
      avatar: classroom.avatar,
      createDate: classroom.createDate ? classroom.createDate.format(DATE_TIME_FORMAT) : null,
      createName: classroom.createName,
      updateDate: classroom.updateDate ? classroom.updateDate.format(DATE_TIME_FORMAT) : null,
      updateName: classroom.updateName,
    });
  }

  protected createFromForm(): IClassroom {
    return {
      ...new Classroom(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      teacherCode: this.editForm.get(['teacherCode'])!.value,
      status: this.editForm.get(['status'])!.value,
      avatar: this.editForm.get(['avatar'])!.value,
      createDate: this.editForm.get(['createDate'])!.value ? dayjs(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      createName: this.editForm.get(['createName'])!.value,
      updateDate: this.editForm.get(['updateDate'])!.value ? dayjs(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateName: this.editForm.get(['updateName'])!.value,
    };
  }
}
