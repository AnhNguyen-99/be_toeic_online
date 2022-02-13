import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HistoryContactDetailsService } from '../service/history-contact-details.service';

import { HistoryContactDetailsComponent } from './history-contact-details.component';

describe('HistoryContactDetails Management Component', () => {
  let comp: HistoryContactDetailsComponent;
  let fixture: ComponentFixture<HistoryContactDetailsComponent>;
  let service: HistoryContactDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HistoryContactDetailsComponent],
    })
      .overrideTemplate(HistoryContactDetailsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HistoryContactDetailsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HistoryContactDetailsService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.historyContactDetails?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
