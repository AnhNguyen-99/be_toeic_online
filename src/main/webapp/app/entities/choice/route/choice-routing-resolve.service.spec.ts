jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IChoice, Choice } from '../choice.model';
import { ChoiceService } from '../service/choice.service';

import { ChoiceRoutingResolveService } from './choice-routing-resolve.service';

describe('Choice routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ChoiceRoutingResolveService;
  let service: ChoiceService;
  let resultChoice: IChoice | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ChoiceRoutingResolveService);
    service = TestBed.inject(ChoiceService);
    resultChoice = undefined;
  });

  describe('resolve', () => {
    it('should return IChoice returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChoice = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChoice).toEqual({ id: 123 });
    });

    it('should return new IChoice if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChoice = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultChoice).toEqual(new Choice());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Choice })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChoice = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChoice).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
