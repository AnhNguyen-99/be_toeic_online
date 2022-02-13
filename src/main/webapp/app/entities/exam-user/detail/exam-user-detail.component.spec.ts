import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExamUserDetailComponent } from './exam-user-detail.component';

describe('ExamUser Management Detail Component', () => {
  let comp: ExamUserDetailComponent;
  let fixture: ComponentFixture<ExamUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamUserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ examUser: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ExamUserDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ExamUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load examUser on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.examUser).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
