import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ChoiceService } from '../service/choice.service';

import { ChoiceComponent } from './choice.component';

describe('Choice Management Component', () => {
  let comp: ChoiceComponent;
  let fixture: ComponentFixture<ChoiceComponent>;
  let service: ChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChoiceComponent],
    })
      .overrideTemplate(ChoiceComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChoiceComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ChoiceService);

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
    expect(comp.choices?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
