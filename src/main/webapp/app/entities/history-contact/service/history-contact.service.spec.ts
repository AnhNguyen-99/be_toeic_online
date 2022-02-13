import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHistoryContact, HistoryContact } from '../history-contact.model';

import { HistoryContactService } from './history-contact.service';

describe('HistoryContact Service', () => {
  let service: HistoryContactService;
  let httpMock: HttpTestingController;
  let elemDefault: IHistoryContact;
  let expectedResult: IHistoryContact | IHistoryContact[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HistoryContactService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      code: 'AAAAAAA',
      title: 'AAAAAAA',
      content: 'AAAAAAA',
      sender: 'AAAAAAA',
      toer: 'AAAAAAA',
      sendDate: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          sendDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a HistoryContact', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          sendDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          sendDate: currentDate,
        },
        returnedFromService
      );

      service.create(new HistoryContact()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HistoryContact', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 'BBBBBB',
          title: 'BBBBBB',
          content: 'BBBBBB',
          sender: 'BBBBBB',
          toer: 'BBBBBB',
          sendDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          sendDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HistoryContact', () => {
      const patchObject = Object.assign(
        {
          content: 'BBBBBB',
          sender: 'BBBBBB',
          toer: 'BBBBBB',
        },
        new HistoryContact()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          sendDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HistoryContact', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 'BBBBBB',
          title: 'BBBBBB',
          content: 'BBBBBB',
          sender: 'BBBBBB',
          toer: 'BBBBBB',
          sendDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          sendDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a HistoryContact', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHistoryContactToCollectionIfMissing', () => {
      it('should add a HistoryContact to an empty array', () => {
        const historyContact: IHistoryContact = { id: 123 };
        expectedResult = service.addHistoryContactToCollectionIfMissing([], historyContact);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(historyContact);
      });

      it('should not add a HistoryContact to an array that contains it', () => {
        const historyContact: IHistoryContact = { id: 123 };
        const historyContactCollection: IHistoryContact[] = [
          {
            ...historyContact,
          },
          { id: 456 },
        ];
        expectedResult = service.addHistoryContactToCollectionIfMissing(historyContactCollection, historyContact);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HistoryContact to an array that doesn't contain it", () => {
        const historyContact: IHistoryContact = { id: 123 };
        const historyContactCollection: IHistoryContact[] = [{ id: 456 }];
        expectedResult = service.addHistoryContactToCollectionIfMissing(historyContactCollection, historyContact);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(historyContact);
      });

      it('should add only unique HistoryContact to an array', () => {
        const historyContactArray: IHistoryContact[] = [{ id: 123 }, { id: 456 }, { id: 78666 }];
        const historyContactCollection: IHistoryContact[] = [{ id: 123 }];
        expectedResult = service.addHistoryContactToCollectionIfMissing(historyContactCollection, ...historyContactArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const historyContact: IHistoryContact = { id: 123 };
        const historyContact2: IHistoryContact = { id: 456 };
        expectedResult = service.addHistoryContactToCollectionIfMissing([], historyContact, historyContact2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(historyContact);
        expect(expectedResult).toContain(historyContact2);
      });

      it('should accept null and undefined values', () => {
        const historyContact: IHistoryContact = { id: 123 };
        expectedResult = service.addHistoryContactToCollectionIfMissing([], null, historyContact, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(historyContact);
      });

      it('should return initial array if no HistoryContact is added', () => {
        const historyContactCollection: IHistoryContact[] = [{ id: 123 }];
        expectedResult = service.addHistoryContactToCollectionIfMissing(historyContactCollection, undefined, null);
        expect(expectedResult).toEqual(historyContactCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
