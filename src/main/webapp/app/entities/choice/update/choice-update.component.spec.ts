jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ChoiceService } from '../service/choice.service';
import { IChoice, Choice } from '../choice.model';

import { ChoiceUpdateComponent } from './choice-update.component';

describe('Choice Management Update Component', () => {
  let comp: ChoiceUpdateComponent;
  let fixture: ComponentFixture<ChoiceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let choiceService: ChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChoiceUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ChoiceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChoiceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    choiceService = TestBed.inject(ChoiceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const choice: IChoice = { id: 456 };

      activatedRoute.data = of({ choice });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(choice));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Choice>>();
      const choice = { id: 123 };
      jest.spyOn(choiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ choice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: choice }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(choiceService.update).toHaveBeenCalledWith(choice);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Choice>>();
      const choice = new Choice();
      jest.spyOn(choiceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ choice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: choice }));
      saveSubject.complete();

      // THEN
      expect(choiceService.create).toHaveBeenCalledWith(choice);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Choice>>();
      const choice = { id: 123 };
      jest.spyOn(choiceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ choice });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(choiceService.update).toHaveBeenCalledWith(choice);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
