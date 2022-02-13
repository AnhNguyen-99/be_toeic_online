import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IClassroomStudent, ClassroomStudent } from '../classroom-student.model';
import { ClassroomStudentService } from '../service/classroom-student.service';

@Injectable({ providedIn: 'root' })
export class ClassroomStudentRoutingResolveService implements Resolve<IClassroomStudent> {
  constructor(protected service: ClassroomStudentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClassroomStudent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((classroomStudent: HttpResponse<ClassroomStudent>) => {
          if (classroomStudent.body) {
            return of(classroomStudent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClassroomStudent());
  }
}
