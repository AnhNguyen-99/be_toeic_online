import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IHistoryContactDetails, HistoryContactDetails } from '../history-contact-details.model';
import { HistoryContactDetailsService } from '../service/history-contact-details.service';

@Component({
  selector: 'jhi-history-contact-details-update',
  templateUrl: './history-contact-details-update.component.html',
})
export class HistoryContactDetailsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    historyContact: [],
    isOpen: [],
    status: [],
  });

  constructor(
    protected historyContactDetailsService: HistoryContactDetailsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historyContactDetails }) => {
      this.updateForm(historyContactDetails);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historyContactDetails = this.createFromForm();
    if (historyContactDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.historyContactDetailsService.update(historyContactDetails));
    } else {
      this.subscribeToSaveResponse(this.historyContactDetailsService.create(historyContactDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoryContactDetails>>): void {
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

  protected updateForm(historyContactDetails: IHistoryContactDetails): void {
    this.editForm.patchValue({
      id: historyContactDetails.id,
      historyContact: historyContactDetails.historyContact,
      isOpen: historyContactDetails.isOpen,
      status: historyContactDetails.status,
    });
  }

  protected createFromForm(): IHistoryContactDetails {
    return {
      ...new HistoryContactDetails(),
      id: this.editForm.get(['id'])!.value,
      historyContact: this.editForm.get(['historyContact'])!.value,
      isOpen: this.editForm.get(['isOpen'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
