import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHistoryContactDetails, HistoryContactDetails } from '../history-contact-details.model';
import { HistoryContactDetailsService } from '../service/history-contact-details.service';

@Injectable({ providedIn: 'root' })
export class HistoryContactDetailsRoutingResolveService implements Resolve<IHistoryContactDetails> {
  constructor(protected service: HistoryContactDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoryContactDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((historyContactDetails: HttpResponse<HistoryContactDetails>) => {
          if (historyContactDetails.body) {
            return of(historyContactDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoryContactDetails());
  }
}
