jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TypeExamService } from '../service/type-exam.service';
import { ITypeExam, TypeExam } from '../type-exam.model';

import { TypeExamUpdateComponent } from './type-exam-update.component';

describe('TypeExam Management Update Component', () => {
  let comp: TypeExamUpdateComponent;
  let fixture: ComponentFixture<TypeExamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typeExamService: TypeExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TypeExamUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(TypeExamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeExamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typeExamService = TestBed.inject(TypeExamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const typeExam: ITypeExam = { id: 456 };

      activatedRoute.data = of({ typeExam });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(typeExam));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TypeExam>>();
      const typeExam = { id: 123 };
      jest.spyOn(typeExamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeExam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeExam }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(typeExamService.update).toHaveBeenCalledWith(typeExam);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TypeExam>>();
      const typeExam = new TypeExam();
      jest.spyOn(typeExamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeExam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeExam }));
      saveSubject.complete();

      // THEN
      expect(typeExamService.create).toHaveBeenCalledWith(typeExam);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TypeExam>>();
      const typeExam = { id: 123 };
      jest.spyOn(typeExamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeExam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typeExamService.update).toHaveBeenCalledWith(typeExam);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
