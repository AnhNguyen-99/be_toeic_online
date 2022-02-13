import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ExamUserService } from '../service/exam-user.service';

import { ExamUserComponent } from './exam-user.component';

describe('ExamUser Management Component', () => {
  let comp: ExamUserComponent;
  let fixture: ComponentFixture<ExamUserComponent>;
  let service: ExamUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ExamUserComponent],
    })
      .overrideTemplate(ExamUserComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExamUserComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ExamUserService);

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
    expect(comp.examUsers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
