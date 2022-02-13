jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ExamUserService } from '../service/exam-user.service';
import { IExamUser, ExamUser } from '../exam-user.model';

import { ExamUserUpdateComponent } from './exam-user-update.component';

describe('ExamUser Management Update Component', () => {
  let comp: ExamUserUpdateComponent;
  let fixture: ComponentFixture<ExamUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let examUserService: ExamUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ExamUserUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ExamUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExamUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    examUserService = TestBed.inject(ExamUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const examUser: IExamUser = { id: 456 };

      activatedRoute.data = of({ examUser });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(examUser));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ExamUser>>();
      const examUser = { id: 123 };
      jest.spyOn(examUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ examUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: examUser }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(examUserService.update).toHaveBeenCalledWith(examUser);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ExamUser>>();
      const examUser = new ExamUser();
      jest.spyOn(examUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ examUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: examUser }));
      saveSubject.complete();

      // THEN
      expect(examUserService.create).toHaveBeenCalledWith(examUser);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ExamUser>>();
      const examUser = { id: 123 };
      jest.spyOn(examUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ examUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(examUserService.update).toHaveBeenCalledWith(examUser);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
