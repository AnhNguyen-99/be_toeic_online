import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeExam } from '../type-exam.model';

@Component({
  selector: 'jhi-type-exam-detail',
  templateUrl: './type-exam-detail.component.html',
})
export class TypeExamDetailComponent implements OnInit {
  typeExam: ITypeExam | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeExam }) => {
      this.typeExam = typeExam;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
