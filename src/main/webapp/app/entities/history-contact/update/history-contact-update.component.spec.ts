jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HistoryContactService } from '../service/history-contact.service';
import { IHistoryContact, HistoryContact } from '../history-contact.model';

import { HistoryContactUpdateComponent } from './history-contact-update.component';

describe('HistoryContact Management Update Component', () => {
  let comp: HistoryContactUpdateComponent;
  let fixture: ComponentFixture<HistoryContactUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let historyContactService: HistoryContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HistoryContactUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(HistoryContactUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HistoryContactUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    historyContactService = TestBed.inject(HistoryContactService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const historyContact: IHistoryContact = { id: 456 };

      activatedRoute.data = of({ historyContact });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(historyContact));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HistoryContact>>();
      const historyContact = { id: 123 };
      jest.spyOn(historyContactService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ historyContact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: historyContact }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(historyContactService.update).toHaveBeenCalledWith(historyContact);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HistoryContact>>();
      const historyContact = new HistoryContact();
      jest.spyOn(historyContactService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ historyContact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: historyContact }));
      saveSubject.complete();

      // THEN
      expect(historyContactService.create).toHaveBeenCalledWith(historyContact);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HistoryContact>>();
      const historyContact = { id: 123 };
      jest.spyOn(historyContactService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ historyContact });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(historyContactService.update).toHaveBeenCalledWith(historyContact);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
