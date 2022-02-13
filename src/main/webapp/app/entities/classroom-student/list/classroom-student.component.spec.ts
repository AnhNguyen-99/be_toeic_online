import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ClassroomStudentService } from '../service/classroom-student.service';

import { ClassroomStudentComponent } from './classroom-student.component';

describe('ClassroomStudent Management Component', () => {
  let comp: ClassroomStudentComponent;
  let fixture: ComponentFixture<ClassroomStudentComponent>;
  let service: ClassroomStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ClassroomStudentComponent],
    })
      .overrideTemplate(ClassroomStudentComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClassroomStudentComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ClassroomStudentService);

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
    expect(comp.classroomStudents?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
