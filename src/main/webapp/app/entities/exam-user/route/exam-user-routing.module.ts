import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ExamUserComponent } from '../list/exam-user.component';
import { ExamUserDetailComponent } from '../detail/exam-user-detail.component';
import { ExamUserUpdateComponent } from '../update/exam-user-update.component';
import { ExamUserRoutingResolveService } from './exam-user-routing-resolve.service';

const examUserRoute: Routes = [
  {
    path: '',
    component: ExamUserComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExamUserDetailComponent,
    resolve: {
      examUser: ExamUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExamUserUpdateComponent,
    resolve: {
      examUser: ExamUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExamUserUpdateComponent,
    resolve: {
      examUser: ExamUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(examUserRoute)],
  exports: [RouterModule],
})
export class ExamUserRoutingModule {}
