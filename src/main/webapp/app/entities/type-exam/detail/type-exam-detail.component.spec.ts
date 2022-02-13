import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeExamDetailComponent } from './type-exam-detail.component';

describe('TypeExam Management Detail Component', () => {
  let comp: TypeExamDetailComponent;
  let fixture: ComponentFixture<TypeExamDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeExamDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ typeExam: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TypeExamDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TypeExamDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load typeExam on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.typeExam).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
