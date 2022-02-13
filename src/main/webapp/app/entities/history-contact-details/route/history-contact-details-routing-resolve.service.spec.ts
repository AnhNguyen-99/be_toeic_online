jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IHistoryContactDetails, HistoryContactDetails } from '../history-contact-details.model';
import { HistoryContactDetailsService } from '../service/history-contact-details.service';

import { HistoryContactDetailsRoutingResolveService } from './history-contact-details-routing-resolve.service';

describe('HistoryContactDetails routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HistoryContactDetailsRoutingResolveService;
  let service: HistoryContactDetailsService;
  let resultHistoryContactDetails: IHistoryContactDetails | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(HistoryContactDetailsRoutingResolveService);
    service = TestBed.inject(HistoryContactDetailsService);
    resultHistoryContactDetails = undefined;
  });

  describe('resolve', () => {
    it('should return IHistoryContactDetails returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHistoryContactDetails = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHistoryContactDetails).toEqual({ id: 123 });
    });

    it('should return new IHistoryContactDetails if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHistoryContactDetails = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHistoryContactDetails).toEqual(new HistoryContactDetails());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as HistoryContactDetails })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHistoryContactDetails = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHistoryContactDetails).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
