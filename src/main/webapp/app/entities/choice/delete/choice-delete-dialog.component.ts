import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChoice } from '../choice.model';
import { ChoiceService } from '../service/choice.service';

@Component({
  templateUrl: './choice-delete-dialog.component.html',
})
export class ChoiceDeleteDialogComponent {
  choice?: IChoice;

  constructor(protected choiceService: ChoiceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.choiceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
