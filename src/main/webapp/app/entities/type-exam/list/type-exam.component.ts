import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeExam } from '../type-exam.model';
import { TypeExamService } from '../service/type-exam.service';
import { TypeExamDeleteDialogComponent } from '../delete/type-exam-delete-dialog.component';

@Component({
  selector: 'jhi-type-exam',
  templateUrl: './type-exam.component.html',
})
export class TypeExamComponent implements OnInit {
  typeExams?: ITypeExam[];
  isLoading = false;

  constructor(protected typeExamService: TypeExamService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.typeExamService.query().subscribe(
      (res: HttpResponse<ITypeExam[]>) => {
        this.isLoading = false;
        this.typeExams = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITypeExam): number {
    return item.id!;
  }

  delete(typeExam: ITypeExam): void {
    const modalRef = this.modalService.open(TypeExamDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeExam = typeExam;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
