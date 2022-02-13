import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChoiceDetailComponent } from './choice-detail.component';

describe('Choice Management Detail Component', () => {
  let comp: ChoiceDetailComponent;
  let fixture: ComponentFixture<ChoiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoiceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ choice: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChoiceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChoiceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load choice on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.choice).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
