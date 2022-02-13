import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeExam, TypeExam } from '../type-exam.model';
import { TypeExamService } from '../service/type-exam.service';

@Injectable({ providedIn: 'root' })
export class TypeExamRoutingResolveService implements Resolve<ITypeExam> {
  constructor(protected service: TypeExamService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeExam> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeExam: HttpResponse<TypeExam>) => {
          if (typeExam.body) {
            return of(typeExam.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeExam());
  }
}
