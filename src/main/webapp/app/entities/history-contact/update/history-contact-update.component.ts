import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IHistoryContact, HistoryContact } from '../history-contact.model';
import { HistoryContactService } from '../service/history-contact.service';

@Component({
  selector: 'jhi-history-contact-update',
  templateUrl: './history-contact-update.component.html',
})
export class HistoryContactUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    title: [],
    content: [],
    sender: [],
    toer: [],
    sendDate: [],
  });

  constructor(
    protected historyContactService: HistoryContactService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historyContact }) => {
      if (historyContact.id === undefined) {
        const today = dayjs().startOf('day');
        historyContact.sendDate = today;
      }

      this.updateForm(historyContact);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historyContact = this.createFromForm();
    if (historyContact.id !== undefined) {
      this.subscribeToSaveResponse(this.historyContactService.update(historyContact));
    } else {
      this.subscribeToSaveResponse(this.historyContactService.create(historyContact));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoryContact>>): void {
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

  protected updateForm(historyContact: IHistoryContact): void {
    this.editForm.patchValue({
      id: historyContact.id,
      code: historyContact.code,
      title: historyContact.title,
      content: historyContact.content,
      sender: historyContact.sender,
      toer: historyContact.toer,
      sendDate: historyContact.sendDate ? historyContact.sendDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IHistoryContact {
    return {
      ...new HistoryContact(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      title: this.editForm.get(['title'])!.value,
      content: this.editForm.get(['content'])!.value,
      sender: this.editForm.get(['sender'])!.value,
      toer: this.editForm.get(['toer'])!.value,
      sendDate: this.editForm.get(['sendDate'])!.value ? dayjs(this.editForm.get(['sendDate'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }
}
