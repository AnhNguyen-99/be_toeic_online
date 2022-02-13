import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoryContact } from '../history-contact.model';

@Component({
  selector: 'jhi-history-contact-detail',
  templateUrl: './history-contact-detail.component.html',
})
export class HistoryContactDetailComponent implements OnInit {
  historyContact: IHistoryContact | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historyContact }) => {
      this.historyContact = historyContact;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
