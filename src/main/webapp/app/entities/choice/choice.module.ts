import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChoiceComponent } from './list/choice.component';
import { ChoiceDetailComponent } from './detail/choice-detail.component';
import { ChoiceUpdateComponent } from './update/choice-update.component';
import { ChoiceDeleteDialogComponent } from './delete/choice-delete-dialog.component';
import { ChoiceRoutingModule } from './route/choice-routing.module';

@NgModule({
  imports: [SharedModule, ChoiceRoutingModule],
  declarations: [ChoiceComponent, ChoiceDetailComponent, ChoiceUpdateComponent, ChoiceDeleteDialogComponent],
  entryComponents: [ChoiceDeleteDialogComponent],
})
export class ChoiceModule {}
