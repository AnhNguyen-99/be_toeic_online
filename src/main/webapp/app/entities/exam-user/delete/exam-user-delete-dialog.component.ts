import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IExamUser } from '../exam-user.model';
import { ExamUserService } from '../service/exam-user.service';

@Component({
  templateUrl: './exam-user-delete-dialog.component.html',
})
export class ExamUserDeleteDialogComponent {
  examUser?: IExamUser;

  constructor(protected examUserService: ExamUserService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.examUserService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
