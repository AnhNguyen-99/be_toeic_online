import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IExamUser, ExamUser } from '../exam-user.model';
import { ExamUserService } from '../service/exam-user.service';

@Injectable({ providedIn: 'root' })
export class ExamUserRoutingResolveService implements Resolve<IExamUser> {
  constructor(protected service: ExamUserService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExamUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((examUser: HttpResponse<ExamUser>) => {
          if (examUser.body) {
            return of(examUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExamUser());
  }
}
