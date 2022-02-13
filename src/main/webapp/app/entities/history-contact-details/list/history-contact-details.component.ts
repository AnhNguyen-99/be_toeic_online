import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoryContactDetails } from '../history-contact-details.model';
import { HistoryContactDetailsService } from '../service/history-contact-details.service';
import { HistoryContactDetailsDeleteDialogComponent } from '../delete/history-contact-details-delete-dialog.component';

@Component({
  selector: 'jhi-history-contact-details',
  templateUrl: './history-contact-details.component.html',
})
export class HistoryContactDetailsComponent implements OnInit {
  historyContactDetails?: IHistoryContactDetails[];
  isLoading = false;

  constructor(protected historyContactDetailsService: HistoryContactDetailsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.historyContactDetailsService.query().subscribe(
      (res: HttpResponse<IHistoryContactDetails[]>) => {
        this.isLoading = false;
        this.historyContactDetails = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IHistoryContactDetails): number {
    return item.id!;
  }

  delete(historyContactDetails: IHistoryContactDetails): void {
    const modalRef = this.modalService.open(HistoryContactDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historyContactDetails = historyContactDetails;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
