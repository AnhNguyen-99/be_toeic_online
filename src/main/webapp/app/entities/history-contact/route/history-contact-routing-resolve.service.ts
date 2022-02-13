import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHistoryContact, HistoryContact } from '../history-contact.model';
import { HistoryContactService } from '../service/history-contact.service';

@Injectable({ providedIn: 'root' })
export class HistoryContactRoutingResolveService implements Resolve<IHistoryContact> {
  constructor(protected service: HistoryContactService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoryContact> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((historyContact: HttpResponse<HistoryContact>) => {
          if (historyContact.body) {
            return of(historyContact.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoryContact());
  }
}
