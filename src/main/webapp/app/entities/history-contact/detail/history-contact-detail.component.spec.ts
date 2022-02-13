import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HistoryContactDetailComponent } from './history-contact-detail.component';

describe('HistoryContact Management Detail Component', () => {
  let comp: HistoryContactDetailComponent;
  let fixture: ComponentFixture<HistoryContactDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryContactDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ historyContact: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HistoryContactDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HistoryContactDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load historyContact on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.historyContact).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
