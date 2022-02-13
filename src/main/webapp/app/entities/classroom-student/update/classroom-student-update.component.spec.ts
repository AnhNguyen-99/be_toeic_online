jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ClassroomStudentService } from '../service/classroom-student.service';
import { IClassroomStudent, ClassroomStudent } from '../classroom-student.model';

import { ClassroomStudentUpdateComponent } from './classroom-student-update.component';

describe('ClassroomStudent Management Update Component', () => {
  let comp: ClassroomStudentUpdateComponent;
  let fixture: ComponentFixture<ClassroomStudentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let classroomStudentService: ClassroomStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ClassroomStudentUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ClassroomStudentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClassroomStudentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    classroomStudentService = TestBed.inject(ClassroomStudentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const classroomStudent: IClassroomStudent = { id: 456 };

      activatedRoute.data = of({ classroomStudent });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(classroomStudent));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ClassroomStudent>>();
      const classroomStudent = { id: 123 };
      jest.spyOn(classroomStudentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomStudent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: classroomStudent }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(classroomStudentService.update).toHaveBeenCalledWith(classroomStudent);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ClassroomStudent>>();
      const classroomStudent = new ClassroomStudent();
      jest.spyOn(classroomStudentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomStudent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: classroomStudent }));
      saveSubject.complete();

      // THEN
      expect(classroomStudentService.create).toHaveBeenCalledWith(classroomStudent);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ClassroomStudent>>();
      const classroomStudent = { id: 123 };
      jest.spyOn(classroomStudentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classroomStudent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(classroomStudentService.update).toHaveBeenCalledWith(classroomStudent);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
