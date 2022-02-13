import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExamUser } from '../exam-user.model';
import { ExamUserService } from '../service/exam-user.service';
import { ExamUserDeleteDialogComponent } from '../delete/exam-user-delete-dialog.component';

@Component({
  selector: 'jhi-exam-user',
  templateUrl: './exam-user.component.html',
})
export class ExamUserComponent implements OnInit {
  examUsers?: IExamUser[];
  isLoading = false;

  constructor(protected examUserService: ExamUserService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.examUserService.query().subscribe(
      (res: HttpResponse<IExamUser[]>) => {
        this.isLoading = false;
        this.examUsers = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IExamUser): number {
    return item.id!;
  }

  delete(examUser: IExamUser): void {
    const modalRef = this.modalService.open(ExamUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.examUser = examUser;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
