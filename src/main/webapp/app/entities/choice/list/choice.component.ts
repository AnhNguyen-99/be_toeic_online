import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChoice } from '../choice.model';
import { ChoiceService } from '../service/choice.service';
import { ChoiceDeleteDialogComponent } from '../delete/choice-delete-dialog.component';

@Component({
  selector: 'jhi-choice',
  templateUrl: './choice.component.html',
})
export class ChoiceComponent implements OnInit {
  choices?: IChoice[];
  isLoading = false;

  constructor(protected choiceService: ChoiceService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.choiceService.query().subscribe(
      (res: HttpResponse<IChoice[]>) => {
        this.isLoading = false;
        this.choices = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IChoice): number {
    return item.id!;
  }

  delete(choice: IChoice): void {
    const modalRef = this.modalService.open(ChoiceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.choice = choice;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
