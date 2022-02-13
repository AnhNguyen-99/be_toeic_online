import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClassroomStudent } from '../classroom-student.model';

@Component({
  selector: 'jhi-classroom-student-detail',
  templateUrl: './classroom-student-detail.component.html',
})
export class ClassroomStudentDetailComponent implements OnInit {
  classroomStudent: IClassroomStudent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classroomStudent }) => {
      this.classroomStudent = classroomStudent;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
