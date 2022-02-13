import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HistoryContactDetailsComponent } from '../list/history-contact-details.component';
import { HistoryContactDetailsDetailComponent } from '../detail/history-contact-details-detail.component';
import { HistoryContactDetailsUpdateComponent } from '../update/history-contact-details-update.component';
import { HistoryContactDetailsRoutingResolveService } from './history-contact-details-routing-resolve.service';

const historyContactDetailsRoute: Routes = [
  {
    path: '',
    component: HistoryContactDetailsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoryContactDetailsDetailComponent,
    resolve: {
      historyContactDetails: HistoryContactDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoryContactDetailsUpdateComponent,
    resolve: {
      historyContactDetails: HistoryContactDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoryContactDetailsUpdateComponent,
    resolve: {
      historyContactDetails: HistoryContactDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(historyContactDetailsRoute)],
  exports: [RouterModule],
})
export class HistoryContactDetailsRoutingModule {}
