import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '../../shared/controls/controls.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    TaskComponent,
    EditModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlsModule,
    RouterModule.forChild([
      { path: '', component: TasksComponent, canActivate: [AuthGuard] },
    ]),
    DragDropModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [TasksComponent, RouterModule],
  providers: [AuthGuard],
})
export class TasksModule {}
