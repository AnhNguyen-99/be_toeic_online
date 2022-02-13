import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeExamComponent } from '../list/type-exam.component';
import { TypeExamDetailComponent } from '../detail/type-exam-detail.component';
import { TypeExamUpdateComponent } from '../update/type-exam-update.component';
import { TypeExamRoutingResolveService } from './type-exam-routing-resolve.service';

const typeExamRoute: Routes = [
  {
    path: '',
    component: TypeExamComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeExamDetailComponent,
    resolve: {
      typeExam: TypeExamRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeExamUpdateComponent,
    resolve: {
      typeExam: TypeExamRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeExamUpdateComponent,
    resolve: {
      typeExam: TypeExamRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeExamRoute)],
  exports: [RouterModule],
})
export class TypeExamRoutingModule {}
