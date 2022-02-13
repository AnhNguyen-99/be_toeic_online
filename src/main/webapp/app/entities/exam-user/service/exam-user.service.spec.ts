import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IExamUser, ExamUser } from '../exam-user.model';

import { ExamUserService } from './exam-user.service';

describe('ExamUser Service', () => {
  let service: ExamUserService;
  let httpMock: HttpTestingController;
  let elemDefault: IExamUser;
  let expectedResult: IExamUser | IExamUser[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ExamUserService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      studentCode: 'AAAAAAA',
      examId: 0,
      totalPoint: 0,
      answerSheet: 'AAAAAAA',
      timeStart: currentDate,
      timeFinish: currentDate,
      timeRemaining: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          timeStart: currentDate.format(DATE_TIME_FORMAT),
          timeFinish: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ExamUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          timeStart: currentDate.format(DATE_TIME_FORMAT),
          timeFinish: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeStart: currentDate,
          timeFinish: currentDate,
        },
        returnedFromService
      );

      service.create(new ExamUser()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ExamUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          studentCode: 'BBBBBB',
          examId: 1,
          totalPoint: 1,
          answerSheet: 'BBBBBB',
          timeStart: currentDate.format(DATE_TIME_FORMAT),
          timeFinish: currentDate.format(DATE_TIME_FORMAT),
          timeRemaining: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeStart: currentDate,
          timeFinish: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ExamUser', () => {
      const patchObject = Object.assign(
        {
          answerSheet: 'BBBBBB',
          timeStart: currentDate.format(DATE_TIME_FORMAT),
          timeFinish: currentDate.format(DATE_TIME_FORMAT),
          timeRemaining: 1,
        },
        new ExamUser()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          timeStart: currentDate,
          timeFinish: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ExamUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          studentCode: 'BBBBBB',
          examId: 1,
          totalPoint: 1,
          answerSheet: 'BBBBBB',
          timeStart: currentDate.format(DATE_TIME_FORMAT),
          timeFinish: currentDate.format(DATE_TIME_FORMAT),
          timeRemaining: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeStart: currentDate,
          timeFinish: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ExamUser', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addExamUserToCollectionIfMissing', () => {
      it('should add a ExamUser to an empty array', () => {
        const examUser: IExamUser = { id: 123 };
        expectedResult = service.addExamUserToCollectionIfMissing([], examUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(examUser);
      });

      it('should not add a ExamUser to an array that contains it', () => {
        const examUser: IExamUser = { id: 123 };
        const examUserCollection: IExamUser[] = [
          {
            ...examUser,
          },
          { id: 456 },
        ];
        expectedResult = service.addExamUserToCollectionIfMissing(examUserCollection, examUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ExamUser to an array that doesn't contain it", () => {
        const examUser: IExamUser = { id: 123 };
        const examUserCollection: IExamUser[] = [{ id: 456 }];
        expectedResult = service.addExamUserToCollectionIfMissing(examUserCollection, examUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(examUser);
      });

      it('should add only unique ExamUser to an array', () => {
        const examUserArray: IExamUser[] = [{ id: 123 }, { id: 456 }, { id: 64458 }];
        const examUserCollection: IExamUser[] = [{ id: 123 }];
        expectedResult = service.addExamUserToCollectionIfMissing(examUserCollection, ...examUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const examUser: IExamUser = { id: 123 };
        const examUser2: IExamUser = { id: 456 };
        expectedResult = service.addExamUserToCollectionIfMissing([], examUser, examUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(examUser);
        expect(expectedResult).toContain(examUser2);
      });

      it('should accept null and undefined values', () => {
        const examUser: IExamUser = { id: 123 };
        expectedResult = service.addExamUserToCollectionIfMissing([], null, examUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(examUser);
      });

      it('should return initial array if no ExamUser is added', () => {
        const examUserCollection: IExamUser[] = [{ id: 123 }];
        expectedResult = service.addExamUserToCollectionIfMissing(examUserCollection, undefined, null);
        expect(expectedResult).toEqual(examUserCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
