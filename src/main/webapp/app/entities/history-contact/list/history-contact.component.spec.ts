import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HistoryContactService } from '../service/history-contact.service';

import { HistoryContactComponent } from './history-contact.component';

describe('HistoryContact Management Component', () => {
  let comp: HistoryContactComponent;
  let fixture: ComponentFixture<HistoryContactComponent>;
  let service: HistoryContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HistoryContactComponent],
    })
      .overrideTemplate(HistoryContactComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HistoryContactComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HistoryContactService);

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
    expect(comp.historyContacts?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
