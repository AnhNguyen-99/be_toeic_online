import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HistoryContactDetailsDetailComponent } from './history-contact-details-detail.component';

describe('HistoryContactDetails Management Detail Component', () => {
  let comp: HistoryContactDetailsDetailComponent;
  let fixture: ComponentFixture<HistoryContactDetailsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryContactDetailsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ historyContactDetails: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HistoryContactDetailsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HistoryContactDetailsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load historyContactDetails on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.historyContactDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
