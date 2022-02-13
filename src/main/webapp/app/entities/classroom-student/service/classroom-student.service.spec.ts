import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClassroomStudent, ClassroomStudent } from '../classroom-student.model';

import { ClassroomStudentService } from './classroom-student.service';

describe('ClassroomStudent Service', () => {
  let service: ClassroomStudentService;
  let httpMock: HttpTestingController;
  let elemDefault: IClassroomStudent;
  let expectedResult: IClassroomStudent | IClassroomStudent[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ClassroomStudentService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      classCode: 'AAAAAAA',
      studentCode: 'AAAAAAA',
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

    it('should create a ClassroomStudent', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ClassroomStudent()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClassroomStudent', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          classCode: 'BBBBBB',
          studentCode: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClassroomStudent', () => {
      const patchObject = Object.assign(
        {
          studentCode: 'BBBBBB',
        },
        new ClassroomStudent()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClassroomStudent', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          classCode: 'BBBBBB',
          studentCode: 'BBBBBB',
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

    it('should delete a ClassroomStudent', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addClassroomStudentToCollectionIfMissing', () => {
      it('should add a ClassroomStudent to an empty array', () => {
        const classroomStudent: IClassroomStudent = { id: 123 };
        expectedResult = service.addClassroomStudentToCollectionIfMissing([], classroomStudent);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(classroomStudent);
      });

      it('should not add a ClassroomStudent to an array that contains it', () => {
        const classroomStudent: IClassroomStudent = { id: 123 };
        const classroomStudentCollection: IClassroomStudent[] = [
          {
            ...classroomStudent,
          },
          { id: 456 },
        ];
        expectedResult = service.addClassroomStudentToCollectionIfMissing(classroomStudentCollection, classroomStudent);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClassroomStudent to an array that doesn't contain it", () => {
        const classroomStudent: IClassroomStudent = { id: 123 };
        const classroomStudentCollection: IClassroomStudent[] = [{ id: 456 }];
        expectedResult = service.addClassroomStudentToCollectionIfMissing(classroomStudentCollection, classroomStudent);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(classroomStudent);
      });

      it('should add only unique ClassroomStudent to an array', () => {
        const classroomStudentArray: IClassroomStudent[] = [{ id: 123 }, { id: 456 }, { id: 89280 }];
        const classroomStudentCollection: IClassroomStudent[] = [{ id: 123 }];
        expectedResult = service.addClassroomStudentToCollectionIfMissing(classroomStudentCollection, ...classroomStudentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const classroomStudent: IClassroomStudent = { id: 123 };
        const classroomStudent2: IClassroomStudent = { id: 456 };
        expectedResult = service.addClassroomStudentToCollectionIfMissing([], classroomStudent, classroomStudent2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(classroomStudent);
        expect(expectedResult).toContain(classroomStudent2);
      });

      it('should accept null and undefined values', () => {
        const classroomStudent: IClassroomStudent = { id: 123 };
        expectedResult = service.addClassroomStudentToCollectionIfMissing([], null, classroomStudent, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(classroomStudent);
      });

      it('should return initial array if no ClassroomStudent is added', () => {
        const classroomStudentCollection: IClassroomStudent[] = [{ id: 123 }];
        expectedResult = service.addClassroomStudentToCollectionIfMissing(classroomStudentCollection, undefined, null);
        expect(expectedResult).toEqual(classroomStudentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
