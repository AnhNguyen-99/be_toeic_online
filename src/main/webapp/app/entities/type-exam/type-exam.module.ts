import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypeExamComponent } from './list/type-exam.component';
import { TypeExamDetailComponent } from './detail/type-exam-detail.component';
import { TypeExamUpdateComponent } from './update/type-exam-update.component';
import { TypeExamDeleteDialogComponent } from './delete/type-exam-delete-dialog.component';
import { TypeExamRoutingModule } from './route/type-exam-routing.module';

@NgModule({
  imports: [SharedModule, TypeExamRoutingModule],
  declarations: [TypeExamComponent, TypeExamDetailComponent, TypeExamUpdateComponent, TypeExamDeleteDialogComponent],
  entryComponents: [TypeExamDeleteDialogComponent],
})
export class TypeExamModule {}
