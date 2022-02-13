import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HistoryContactDetailsComponent } from './list/history-contact-details.component';
import { HistoryContactDetailsDetailComponent } from './detail/history-contact-details-detail.component';
import { HistoryContactDetailsUpdateComponent } from './update/history-contact-details-update.component';
import { HistoryContactDetailsDeleteDialogComponent } from './delete/history-contact-details-delete-dialog.component';
import { HistoryContactDetailsRoutingModule } from './route/history-contact-details-routing.module';

@NgModule({
  imports: [SharedModule, HistoryContactDetailsRoutingModule],
  declarations: [
    HistoryContactDetailsComponent,
    HistoryContactDetailsDetailComponent,
    HistoryContactDetailsUpdateComponent,
    HistoryContactDetailsDeleteDialogComponent,
  ],
  entryComponents: [HistoryContactDetailsDeleteDialogComponent],
})
export class HistoryContactDetailsModule {}
