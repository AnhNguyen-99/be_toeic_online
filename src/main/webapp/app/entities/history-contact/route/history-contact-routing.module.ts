import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HistoryContactComponent } from '../list/history-contact.component';
import { HistoryContactDetailComponent } from '../detail/history-contact-detail.component';
import { HistoryContactUpdateComponent } from '../update/history-contact-update.component';
import { HistoryContactRoutingResolveService } from './history-contact-routing-resolve.service';

const historyContactRoute: Routes = [
  {
    path: '',
    component: HistoryContactComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoryContactDetailComponent,
    resolve: {
      historyContact: HistoryContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoryContactUpdateComponent,
    resolve: {
      historyContact: HistoryContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoryContactUpdateComponent,
    resolve: {
      historyContact: HistoryContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(historyContactRoute)],
  exports: [RouterModule],
})
export class HistoryContactRoutingModule {}
