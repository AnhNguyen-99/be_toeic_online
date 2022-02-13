import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExamUser } from '../exam-user.model';

@Component({
  selector: 'jhi-exam-user-detail',
  templateUrl: './exam-user-detail.component.html',
})
export class ExamUserDetailComponent implements OnInit {
  examUser: IExamUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examUser }) => {
      this.examUser = examUser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
