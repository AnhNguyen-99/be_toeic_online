import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChoiceComponent } from '../list/choice.component';
import { ChoiceDetailComponent } from '../detail/choice-detail.component';
import { ChoiceUpdateComponent } from '../update/choice-update.component';
import { ChoiceRoutingResolveService } from './choice-routing-resolve.service';

const choiceRoute: Routes = [
  {
    path: '',
    component: ChoiceComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChoiceDetailComponent,
    resolve: {
      choice: ChoiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChoiceUpdateComponent,
    resolve: {
      choice: ChoiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChoiceUpdateComponent,
    resolve: {
      choice: ChoiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(choiceRoute)],
  exports: [RouterModule],
})
export class ChoiceRoutingModule {}
