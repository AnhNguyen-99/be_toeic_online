import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClassroomStudentComponent } from '../list/classroom-student.component';
import { ClassroomStudentDetailComponent } from '../detail/classroom-student-detail.component';
import { ClassroomStudentUpdateComponent } from '../update/classroom-student-update.component';
import { ClassroomStudentRoutingResolveService } from './classroom-student-routing-resolve.service';

const classroomStudentRoute: Routes = [
  {
    path: '',
    component: ClassroomStudentComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClassroomStudentDetailComponent,
    resolve: {
      classroomStudent: ClassroomStudentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClassroomStudentUpdateComponent,
    resolve: {
      classroomStudent: ClassroomStudentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClassroomStudentUpdateComponent,
    resolve: {
      classroomStudent: ClassroomStudentRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(classroomStudentRoute)],
  exports: [RouterModule],
})
export class ClassroomStudentRoutingModule {}
