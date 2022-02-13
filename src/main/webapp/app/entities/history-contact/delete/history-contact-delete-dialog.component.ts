import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoryContact } from '../history-contact.model';
import { HistoryContactService } from '../service/history-contact.service';

@Component({
  templateUrl: './history-contact-delete-dialog.component.html',
})
export class HistoryContactDeleteDialogComponent {
  historyContact?: IHistoryContact;

  constructor(protected historyContactService: HistoryContactService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historyContactService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
