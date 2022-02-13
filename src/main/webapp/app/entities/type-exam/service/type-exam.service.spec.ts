import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeExam, TypeExam } from '../type-exam.model';

import { TypeExamService } from './type-exam.service';

describe('TypeExam Service', () => {
  let service: TypeExamService;
  let httpMock: HttpTestingController;
  let elemDefault: ITypeExam;
  let expectedResult: ITypeExam | ITypeExam[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TypeExamService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      code: 'AAAAAAA',
      name: 'AAAAAAA',
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

    it('should create a TypeExam', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TypeExam()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TypeExam', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 'BBBBBB',
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TypeExam', () => {
      const patchObject = Object.assign({}, new TypeExam());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TypeExam', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          code: 'BBBBBB',
          name: 'BBBBBB',
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

    it('should delete a TypeExam', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTypeExamToCollectionIfMissing', () => {
      it('should add a TypeExam to an empty array', () => {
        const typeExam: ITypeExam = { id: 123 };
        expectedResult = service.addTypeExamToCollectionIfMissing([], typeExam);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeExam);
      });

      it('should not add a TypeExam to an array that contains it', () => {
        const typeExam: ITypeExam = { id: 123 };
        const typeExamCollection: ITypeExam[] = [
          {
            ...typeExam,
          },
          { id: 456 },
        ];
        expectedResult = service.addTypeExamToCollectionIfMissing(typeExamCollection, typeExam);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TypeExam to an array that doesn't contain it", () => {
        const typeExam: ITypeExam = { id: 123 };
        const typeExamCollection: ITypeExam[] = [{ id: 456 }];
        expectedResult = service.addTypeExamToCollectionIfMissing(typeExamCollection, typeExam);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeExam);
      });

      it('should add only unique TypeExam to an array', () => {
        const typeExamArray: ITypeExam[] = [{ id: 123 }, { id: 456 }, { id: 65476 }];
        const typeExamCollection: ITypeExam[] = [{ id: 123 }];
        expectedResult = service.addTypeExamToCollectionIfMissing(typeExamCollection, ...typeExamArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const typeExam: ITypeExam = { id: 123 };
        const typeExam2: ITypeExam = { id: 456 };
        expectedResult = service.addTypeExamToCollectionIfMissing([], typeExam, typeExam2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(typeExam);
        expect(expectedResult).toContain(typeExam2);
      });

      it('should accept null and undefined values', () => {
        const typeExam: ITypeExam = { id: 123 };
        expectedResult = service.addTypeExamToCollectionIfMissing([], null, typeExam, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(typeExam);
      });

      it('should return initial array if no TypeExam is added', () => {
        const typeExamCollection: ITypeExam[] = [{ id: 123 }];
        expectedResult = service.addTypeExamToCollectionIfMissing(typeExamCollection, undefined, null);
        expect(expectedResult).toEqual(typeExamCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
