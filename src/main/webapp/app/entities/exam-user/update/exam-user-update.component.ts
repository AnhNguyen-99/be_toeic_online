import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IExamUser, ExamUser } from '../exam-user.model';
import { ExamUserService } from '../service/exam-user.service';

@Component({
  selector: 'jhi-exam-user-update',
  templateUrl: './exam-user-update.component.html',
})
export class ExamUserUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    studentCode: [],
    examId: [],
    totalPoint: [],
    answerSheet: [],
    timeStart: [],
    timeFinish: [],
    timeRemaining: [],
  });

  constructor(protected examUserService: ExamUserService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examUser }) => {
      if (examUser.id === undefined) {
        const today = dayjs().startOf('day');
        examUser.timeStart = today;
        examUser.timeFinish = today;
      }

      this.updateForm(examUser);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const examUser = this.createFromForm();
    if (examUser.id !== undefined) {
      this.subscribeToSaveResponse(this.examUserService.update(examUser));
    } else {
      this.subscribeToSaveResponse(this.examUserService.create(examUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExamUser>>): void {
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

  protected updateForm(examUser: IExamUser): void {
    this.editForm.patchValue({
      id: examUser.id,
      studentCode: examUser.studentCode,
      examId: examUser.examId,
      totalPoint: examUser.totalPoint,
      answerSheet: examUser.answerSheet,
      timeStart: examUser.timeStart ? examUser.timeStart.format(DATE_TIME_FORMAT) : null,
      timeFinish: examUser.timeFinish ? examUser.timeFinish.format(DATE_TIME_FORMAT) : null,
      timeRemaining: examUser.timeRemaining,
    });
  }

  protected createFromForm(): IExamUser {
    return {
      ...new ExamUser(),
      id: this.editForm.get(['id'])!.value,
      studentCode: this.editForm.get(['studentCode'])!.value,
      examId: this.editForm.get(['examId'])!.value,
      totalPoint: this.editForm.get(['totalPoint'])!.value,
      answerSheet: this.editForm.get(['answerSheet'])!.value,
      timeStart: this.editForm.get(['timeStart'])!.value ? dayjs(this.editForm.get(['timeStart'])!.value, DATE_TIME_FORMAT) : undefined,
      timeFinish: this.editForm.get(['timeFinish'])!.value ? dayjs(this.editForm.get(['timeFinish'])!.value, DATE_TIME_FORMAT) : undefined,
      timeRemaining: this.editForm.get(['timeRemaining'])!.value,
    };
  }
}
