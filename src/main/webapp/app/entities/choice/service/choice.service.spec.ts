import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChoice, Choice } from '../choice.model';

import { ChoiceService } from './choice.service';

describe('Choice Service', () => {
  let service: ChoiceService;
  let httpMock: HttpTestingController;
  let elemDefault: IChoice;
  let expectedResult: IChoice | IChoice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChoiceService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      questionId: 0,
      choiceText: 'AAAAAAA',
      corrected: 'AAAAAAA',
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

    it('should create a Choice', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Choice()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Choice', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          questionId: 1,
          choiceText: 'BBBBBB',
          corrected: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Choice', () => {
      const patchObject = Object.assign(
        {
          choiceText: 'BBBBBB',
          corrected: 'BBBBBB',
        },
        new Choice()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Choice', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          questionId: 1,
          choiceText: 'BBBBBB',
          corrected: 'BBBBBB',
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

    it('should delete a Choice', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChoiceToCollectionIfMissing', () => {
      it('should add a Choice to an empty array', () => {
        const choice: IChoice = { id: 123 };
        expectedResult = service.addChoiceToCollectionIfMissing([], choice);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(choice);
      });

      it('should not add a Choice to an array that contains it', () => {
        const choice: IChoice = { id: 123 };
        const choiceCollection: IChoice[] = [
          {
            ...choice,
          },
          { id: 456 },
        ];
        expectedResult = service.addChoiceToCollectionIfMissing(choiceCollection, choice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Choice to an array that doesn't contain it", () => {
        const choice: IChoice = { id: 123 };
        const choiceCollection: IChoice[] = [{ id: 456 }];
        expectedResult = service.addChoiceToCollectionIfMissing(choiceCollection, choice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(choice);
      });

      it('should add only unique Choice to an array', () => {
        const choiceArray: IChoice[] = [{ id: 123 }, { id: 456 }, { id: 51951 }];
        const choiceCollection: IChoice[] = [{ id: 123 }];
        expectedResult = service.addChoiceToCollectionIfMissing(choiceCollection, ...choiceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const choice: IChoice = { id: 123 };
        const choice2: IChoice = { id: 456 };
        expectedResult = service.addChoiceToCollectionIfMissing([], choice, choice2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(choice);
        expect(expectedResult).toContain(choice2);
      });

      it('should accept null and undefined values', () => {
        const choice: IChoice = { id: 123 };
        expectedResult = service.addChoiceToCollectionIfMissing([], null, choice, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(choice);
      });

      it('should return initial array if no Choice is added', () => {
        const choiceCollection: IChoice[] = [{ id: 123 }];
        expectedResult = service.addChoiceToCollectionIfMissing(choiceCollection, undefined, null);
        expect(expectedResult).toEqual(choiceCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
