import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChoice, Choice } from '../choice.model';
import { ChoiceService } from '../service/choice.service';

@Injectable({ providedIn: 'root' })
export class ChoiceRoutingResolveService implements Resolve<IChoice> {
  constructor(protected service: ChoiceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChoice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((choice: HttpResponse<Choice>) => {
          if (choice.body) {
            return of(choice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Choice());
  }
}
