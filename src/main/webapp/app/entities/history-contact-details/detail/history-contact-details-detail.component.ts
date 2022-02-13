import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoryContactDetails } from '../history-contact-details.model';

@Component({
  selector: 'jhi-history-contact-details-detail',
  templateUrl: './history-contact-details-detail.component.html',
})
export class HistoryContactDetailsDetailComponent implements OnInit {
  historyContactDetails: IHistoryContactDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historyContactDetails }) => {
      this.historyContactDetails = historyContactDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
