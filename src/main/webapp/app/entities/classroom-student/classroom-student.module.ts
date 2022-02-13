import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClassroomStudentComponent } from './list/classroom-student.component';
import { ClassroomStudentDetailComponent } from './detail/classroom-student-detail.component';
import { ClassroomStudentUpdateComponent } from './update/classroom-student-update.component';
import { ClassroomStudentDeleteDialogComponent } from './delete/classroom-student-delete-dialog.component';
import { ClassroomStudentRoutingModule } from './route/classroom-student-routing.module';

@NgModule({
  imports: [SharedModule, ClassroomStudentRoutingModule],
  declarations: [
    ClassroomStudentComponent,
    ClassroomStudentDetailComponent,
    ClassroomStudentUpdateComponent,
    ClassroomStudentDeleteDialogComponent,
  ],
  entryComponents: [ClassroomStudentDeleteDialogComponent],
})
export class ClassroomStudentModule {}
