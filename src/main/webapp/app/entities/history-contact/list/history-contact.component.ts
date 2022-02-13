import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoryContact } from '../history-contact.model';
import { HistoryContactService } from '../service/history-contact.service';
import { HistoryContactDeleteDialogComponent } from '../delete/history-contact-delete-dialog.component';

@Component({
  selector: 'jhi-history-contact',
  templateUrl: './history-contact.component.html',
})
export class HistoryContactComponent implements OnInit {
  historyContacts?: IHistoryContact[];
  isLoading = false;

  constructor(protected historyContactService: HistoryContactService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.historyContactService.query().subscribe(
      (res: HttpResponse<IHistoryContact[]>) => {
        this.isLoading = false;
        this.historyContacts = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IHistoryContact): number {
    return item.id!;
  }

  delete(historyContact: IHistoryContact): void {
    const modalRef = this.modalService.open(HistoryContactDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historyContact = historyContact;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
