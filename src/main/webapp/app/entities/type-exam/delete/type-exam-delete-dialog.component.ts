import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeExam } from '../type-exam.model';
import { TypeExamService } from '../service/type-exam.service';

@Component({
  templateUrl: './type-exam-delete-dialog.component.html',
})
export class TypeExamDeleteDialogComponent {
  typeExam?: ITypeExam;

  constructor(protected typeExamService: TypeExamService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeExamService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
