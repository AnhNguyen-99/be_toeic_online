import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassroomStudentDetailComponent } from './classroom-student-detail.component';

describe('ClassroomStudent Management Detail Component', () => {
  let comp: ClassroomStudentDetailComponent;
  let fixture: ComponentFixture<ClassroomStudentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomStudentDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ classroomStudent: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ClassroomStudentDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ClassroomStudentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load classroomStudent on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.classroomStudent).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
