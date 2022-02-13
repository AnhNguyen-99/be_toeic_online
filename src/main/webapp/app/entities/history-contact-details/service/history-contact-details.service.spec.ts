import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHistoryContactDetails, HistoryContactDetails } from '../history-contact-details.model';

import { HistoryContactDetailsService } from './history-contact-details.service';

describe('HistoryContactDetails Service', () => {
  let service: HistoryContactDetailsService;
  let httpMock: HttpTestingController;
  let elemDefault: IHistoryContactDetails;
  let expectedResult: IHistoryContactDetails | IHistoryContactDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HistoryContactDetailsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      historyContact: 'AAAAAAA',
      isOpen: false,
      status: false,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a HistoryContactDetails', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new HistoryContactDetails()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HistoryContactDetails', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          historyContact: 'BBBBBB',
          isOpen: true,
          status: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HistoryContactDetails', () => {
      const patchObject = Object.assign(
        {
          historyContact: 'BBBBBB',
        },
        new HistoryContactDetails()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HistoryContactDetails', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          historyContact: 'BBBBBB',
          isOpen: true,
          status: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a HistoryContactDetails', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHistoryContactDetailsToCollectionIfMissing', () => {
      it('should add a HistoryContactDetails to an empty array', () => {
        const historyContactDetails: IHistoryContactDetails = { id: 123 };
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing([], historyContactDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(historyContactDetails);
      });

      it('should not add a HistoryContactDetails to an array that contains it', () => {
        const historyContactDetails: IHistoryContactDetails = { id: 123 };
        const historyContactDetailsCollection: IHistoryContactDetails[] = [
          {
            ...historyContactDetails,
          },
          { id: 456 },
        ];
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing(historyContactDetailsCollection, historyContactDetails);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HistoryContactDetails to an array that doesn't contain it", () => {
        const historyContactDetails: IHistoryContactDetails = { id: 123 };
        const historyContactDetailsCollection: IHistoryContactDetails[] = [{ id: 456 }];
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing(historyContactDetailsCollection, historyContactDetails);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(historyContactDetails);
      });

      it('should add only unique HistoryContactDetails to an array', () => {
        const historyContactDetailsArray: IHistoryContactDetails[] = [{ id: 123 }, { id: 456 }, { id: 86353 }];
        const historyContactDetailsCollection: IHistoryContactDetails[] = [{ id: 123 }];
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing(
          historyContactDetailsCollection,
          ...historyContactDetailsArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const historyContactDetails: IHistoryContactDetails = { id: 123 };
        const historyContactDetails2: IHistoryContactDetails = { id: 456 };
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing([], historyContactDetails, historyContactDetails2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(historyContactDetails);
        expect(expectedResult).toContain(historyContactDetails2);
      });

      it('should accept null and undefined values', () => {
        const historyContactDetails: IHistoryContactDetails = { id: 123 };
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing([], null, historyContactDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(historyContactDetails);
      });

      it('should return initial array if no HistoryContactDetails is added', () => {
        const historyContactDetailsCollection: IHistoryContactDetails[] = [{ id: 123 }];
        expectedResult = service.addHistoryContactDetailsToCollectionIfMissing(historyContactDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(historyContactDetailsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
