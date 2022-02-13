import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClassroomStudent } from '../classroom-student.model';
import { ClassroomStudentService } from '../service/classroom-student.service';
import { ClassroomStudentDeleteDialogComponent } from '../delete/classroom-student-delete-dialog.component';

@Component({
  selector: 'jhi-classroom-student',
  templateUrl: './classroom-student.component.html',
})
export class ClassroomStudentComponent implements OnInit {
  classroomStudents?: IClassroomStudent[];
  isLoading = false;

  constructor(protected classroomStudentService: ClassroomStudentService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.classroomStudentService.query().subscribe(
      (res: HttpResponse<IClassroomStudent[]>) => {
        this.isLoading = false;
        this.classroomStudents = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IClassroomStudent): number {
    return item.id!;
  }

  delete(classroomStudent: IClassroomStudent): void {
    const modalRef = this.modalService.open(ClassroomStudentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.classroomStudent = classroomStudent;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
