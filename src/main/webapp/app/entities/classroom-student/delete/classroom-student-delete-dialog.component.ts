import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClassroomStudent } from '../classroom-student.model';
import { ClassroomStudentService } from '../service/classroom-student.service';

@Component({
  templateUrl: './classroom-student-delete-dialog.component.html',
})
export class ClassroomStudentDeleteDialogComponent {
  classroomStudent?: IClassroomStudent;

  constructor(protected classroomStudentService: ClassroomStudentService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.classroomStudentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
