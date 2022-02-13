import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HistoryContactComponent } from './list/history-contact.component';
import { HistoryContactDetailComponent } from './detail/history-contact-detail.component';
import { HistoryContactUpdateComponent } from './update/history-contact-update.component';
import { HistoryContactDeleteDialogComponent } from './delete/history-contact-delete-dialog.component';
import { HistoryContactRoutingModule } from './route/history-contact-routing.module';

@NgModule({
  imports: [SharedModule, HistoryContactRoutingModule],
  declarations: [
    HistoryContactComponent,
    HistoryContactDetailComponent,
    HistoryContactUpdateComponent,
    HistoryContactDeleteDialogComponent,
  ],
  entryComponents: [HistoryContactDeleteDialogComponent],
})
export class HistoryContactModule {}
