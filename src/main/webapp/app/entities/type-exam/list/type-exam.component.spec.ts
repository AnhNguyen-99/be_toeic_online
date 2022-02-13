import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TypeExamService } from '../service/type-exam.service';

import { TypeExamComponent } from './type-exam.component';

describe('TypeExam Management Component', () => {
  let comp: TypeExamComponent;
  let fixture: ComponentFixture<TypeExamComponent>;
  let service: TypeExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TypeExamComponent],
    })
      .overrideTemplate(TypeExamComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeExamComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TypeExamService);

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
    expect(comp.typeExams?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
