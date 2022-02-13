jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IClassroomStudent, ClassroomStudent } from '../classroom-student.model';
import { ClassroomStudentService } from '../service/classroom-student.service';

import { ClassroomStudentRoutingResolveService } from './classroom-student-routing-resolve.service';

describe('ClassroomStudent routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ClassroomStudentRoutingResolveService;
  let service: ClassroomStudentService;
  let resultClassroomStudent: IClassroomStudent | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ClassroomStudentRoutingResolveService);
    service = TestBed.inject(ClassroomStudentService);
    resultClassroomStudent = undefined;
  });

  describe('resolve', () => {
    it('should return IClassroomStudent returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultClassroomStudent = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultClassroomStudent).toEqual({ id: 123 });
    });

    it('should return new IClassroomStudent if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultClassroomStudent = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultClassroomStudent).toEqual(new ClassroomStudent());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ClassroomStudent })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultClassroomStudent = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultClassroomStudent).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
