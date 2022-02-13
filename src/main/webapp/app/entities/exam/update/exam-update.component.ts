import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IExam, Exam } from '../exam.model';
import { ExamService } from '../service/exam.service';

@Component({
  selector: 'jhi-exam-update',
  templateUrl: './exam-update.component.html',
})
export class ExamUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    beginExam: [],
    durationExam: [],
    finishExam: [],
    questionData: [],
    subjectCode: [],
    title: [],
    status: [],
    createDate: [],
    createName: [],
    updateDate: [],
    updateName: [],
  });

  constructor(protected examService: ExamService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exam }) => {
      if (exam.id === undefined) {
        const today = dayjs().startOf('day');
        exam.beginExam = today;
        exam.finishExam = today;
        exam.createDate = today;
        exam.updateDate = today;
      }

      this.updateForm(exam);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exam = this.createFromForm();
    if (exam.id !== undefined) {
      this.subscribeToSaveResponse(this.examService.update(exam));
    } else {
      this.subscribeToSaveResponse(this.examService.create(exam));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExam>>): void {
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

  protected updateForm(exam: IExam): void {
    this.editForm.patchValue({
      id: exam.id,
      beginExam: exam.beginExam ? exam.beginExam.format(DATE_TIME_FORMAT) : null,
      durationExam: exam.durationExam,
      finishExam: exam.finishExam ? exam.finishExam.format(DATE_TIME_FORMAT) : null,
      questionData: exam.questionData,
      subjectCode: exam.subjectCode,
      title: exam.title,
      status: exam.status,
      createDate: exam.createDate ? exam.createDate.format(DATE_TIME_FORMAT) : null,
      createName: exam.createName,
      updateDate: exam.updateDate ? exam.updateDate.format(DATE_TIME_FORMAT) : null,
      updateName: exam.updateName,
    });
  }

  protected createFromForm(): IExam {
    return {
      ...new Exam(),
      id: this.editForm.get(['id'])!.value,
      beginExam: this.editForm.get(['beginExam'])!.value ? dayjs(this.editForm.get(['beginExam'])!.value, DATE_TIME_FORMAT) : undefined,
      durationExam: this.editForm.get(['durationExam'])!.value,
      finishExam: this.editForm.get(['finishExam'])!.value ? dayjs(this.editForm.get(['finishExam'])!.value, DATE_TIME_FORMAT) : undefined,
      questionData: this.editForm.get(['questionData'])!.value,
      subjectCode: this.editForm.get(['subjectCode'])!.value,
      title: this.editForm.get(['title'])!.value,
      status: this.editForm.get(['status'])!.value,
      createDate: this.editForm.get(['createDate'])!.value ? dayjs(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      createName: this.editForm.get(['createName'])!.value,
      updateDate: this.editForm.get(['updateDate'])!.value ? dayjs(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateName: this.editForm.get(['updateName'])!.value,
    };
  }
}
