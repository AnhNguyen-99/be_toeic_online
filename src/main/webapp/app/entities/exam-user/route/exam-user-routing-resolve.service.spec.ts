jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IExamUser, ExamUser } from '../exam-user.model';
import { ExamUserService } from '../service/exam-user.service';

import { ExamUserRoutingResolveService } from './exam-user-routing-resolve.service';

describe('ExamUser routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ExamUserRoutingResolveService;
  let service: ExamUserService;
  let resultExamUser: IExamUser | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ExamUserRoutingResolveService);
    service = TestBed.inject(ExamUserService);
    resultExamUser = undefined;
  });

  describe('resolve', () => {
    it('should return IExamUser returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultExamUser = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultExamUser).toEqual({ id: 123 });
    });

    it('should return new IExamUser if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultExamUser = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultExamUser).toEqual(new ExamUser());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ExamUser })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultExamUser = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultExamUser).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
