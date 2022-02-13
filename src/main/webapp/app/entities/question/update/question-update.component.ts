import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IQuestion, Question } from '../question.model';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html',
})
export class QuestionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    questionType: [],
    questionText: [],
    subjectCode: [],
    level: [],
    point: [],
    status: [],
    createDate: [],
    createName: [],
    updateDate: [],
    updateName: [],
  });

  constructor(protected questionService: QuestionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ question }) => {
      if (question.id === undefined) {
        const today = dayjs().startOf('day');
        question.createDate = today;
        question.updateDate = today;
      }

      this.updateForm(question);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const question = this.createFromForm();
    if (question.id !== undefined) {
      this.subscribeToSaveResponse(this.questionService.update(question));
    } else {
      this.subscribeToSaveResponse(this.questionService.create(question));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>): void {
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

  protected updateForm(question: IQuestion): void {
    this.editForm.patchValue({
      id: question.id,
      questionType: question.questionType,
      questionText: question.questionText,
      subjectCode: question.subjectCode,
      level: question.level,
      point: question.point,
      status: question.status,
      createDate: question.createDate ? question.createDate.format(DATE_TIME_FORMAT) : null,
      createName: question.createName,
      updateDate: question.updateDate ? question.updateDate.format(DATE_TIME_FORMAT) : null,
      updateName: question.updateName,
    });
  }

  protected createFromForm(): IQuestion {
    return {
      ...new Question(),
      id: this.editForm.get(['id'])!.value,
      questionType: this.editForm.get(['questionType'])!.value,
      questionText: this.editForm.get(['questionText'])!.value,
      subjectCode: this.editForm.get(['subjectCode'])!.value,
      level: this.editForm.get(['level'])!.value,
      point: this.editForm.get(['point'])!.value,
      status: this.editForm.get(['status'])!.value,
      createDate: this.editForm.get(['createDate'])!.value ? dayjs(this.editForm.get(['createDate'])!.value, DATE_TIME_FORMAT) : undefined,
      createName: this.editForm.get(['createName'])!.value,
      updateDate: this.editForm.get(['updateDate'])!.value ? dayjs(this.editForm.get(['updateDate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateName: this.editForm.get(['updateName'])!.value,
    };
  }
}
