import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IClassroomStudent, ClassroomStudent } from '../classroom-student.model';
import { ClassroomStudentService } from '../service/classroom-student.service';

@Component({
  selector: 'jhi-classroom-student-update',
  templateUrl: './classroom-student-update.component.html',
})
export class ClassroomStudentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    classCode: [],
    studentCode: [],
  });

  constructor(
    protected classroomStudentService: ClassroomStudentService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroomStudent }) => {
      this.updateForm(classroomStudent);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classroomStudent = this.createFromForm();
    if (classroomStudent.id !== undefined) {
      this.subscribeToSaveResponse(this.classroomStudentService.update(classroomStudent));
    } else {
      this.subscribeToSaveResponse(this.classroomStudentService.create(classroomStudent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassroomStudent>>): void {
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

  protected updateForm(classroomStudent: IClassroomStudent): void {
    this.editForm.patchValue({
      id: classroomStudent.id,
      classCode: classroomStudent.classCode,
      studentCode: classroomStudent.studentCode,
    });
  }

  protected createFromForm(): IClassroomStudent {
    return {
      ...new ClassroomStudent(),
      id: this.editForm.get(['id'])!.value,
      classCode: this.editForm.get(['classCode'])!.value,
      studentCode: this.editForm.get(['studentCode'])!.value,
    };
  }
}
