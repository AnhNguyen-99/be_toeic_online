import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ExamUserComponent } from './list/exam-user.component';
import { ExamUserDetailComponent } from './detail/exam-user-detail.component';
import { ExamUserUpdateComponent } from './update/exam-user-update.component';
import { ExamUserDeleteDialogComponent } from './delete/exam-user-delete-dialog.component';
import { ExamUserRoutingModule } from './route/exam-user-routing.module';

@NgModule({
  imports: [SharedModule, ExamUserRoutingModule],
  declarations: [ExamUserComponent, ExamUserDetailComponent, ExamUserUpdateComponent, ExamUserDeleteDialogComponent],
  entryComponents: [ExamUserDeleteDialogComponent],
})
export class ExamUserModule {}
