import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemeComponent } from '../../shared/components/theme/theme.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ControlsModule } from '../../shared/controls/controls.module';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksComponent } from './components/tasks/tasks.component';

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
      {
        path: 'theme',
        component: ThemeComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Theme' },
      },
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
    MatProgressSpinnerModule,
  ],
  exports: [TasksComponent, RouterModule],
  providers: [AuthGuard],
})
export class TasksModule {}
