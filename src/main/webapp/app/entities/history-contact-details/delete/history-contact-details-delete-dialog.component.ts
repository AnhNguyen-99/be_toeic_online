import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoryContactDetails } from '../history-contact-details.model';
import { HistoryContactDetailsService } from '../service/history-contact-details.service';

@Component({
  templateUrl: './history-contact-details-delete-dialog.component.html',
})
export class HistoryContactDetailsDeleteDialogComponent {
  historyContactDetails?: IHistoryContactDetails;

  constructor(protected historyContactDetailsService: HistoryContactDetailsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historyContactDetailsService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
