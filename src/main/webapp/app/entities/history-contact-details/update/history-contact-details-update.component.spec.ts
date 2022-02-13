jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HistoryContactDetailsService } from '../service/history-contact-details.service';
import { IHistoryContactDetails, HistoryContactDetails } from '../history-contact-details.model';

import { HistoryContactDetailsUpdateComponent } from './history-contact-details-update.component';

describe('HistoryContactDetails Management Update Component', () => {
  let comp: HistoryContactDetailsUpdateComponent;
  let fixture: ComponentFixture<HistoryContactDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let historyContactDetailsService: HistoryContactDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HistoryContactDetailsUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(HistoryContactDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HistoryContactDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    historyContactDetailsService = TestBed.inject(HistoryContactDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const historyContactDetails: IHistoryContactDetails = { id: 456 };

      activatedRoute.data = of({ historyContactDetails });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(historyContactDetails));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HistoryContactDetails>>();
      const historyContactDetails = { id: 123 };
      jest.spyOn(historyContactDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ historyContactDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: historyContactDetails }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(historyContactDetailsService.update).toHaveBeenCalledWith(historyContactDetails);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HistoryContactDetails>>();
      const historyContactDetails = new HistoryContactDetails();
      jest.spyOn(historyContactDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ historyContactDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: historyContactDetails }));
      saveSubject.complete();

      // THEN
      expect(historyContactDetailsService.create).toHaveBeenCalledWith(historyContactDetails);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HistoryContactDetails>>();
      const historyContactDetails = { id: 123 };
      jest.spyOn(historyContactDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ historyContactDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(historyContactDetailsService.update).toHaveBeenCalledWith(historyContactDetails);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
