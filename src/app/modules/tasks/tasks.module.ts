import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksComponent} from './components/tasks/tasks.component';
import {AddTaskFormComponent} from './components/add-task-form/add-task-form.component';
import {TaskComponent} from './components/task/task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ControlsModule} from '../../shared/controls/controls.module';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';



@NgModule({
  declarations: [
    TasksComponent,
    AddTaskFormComponent,
    TaskComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlsModule,
    RouterModule.forChild([
      {path:'', component: TasksComponent, canActivate: [AuthGuard]}
    ])
  ],
  exports: [
    TasksComponent,
    RouterModule
  ],
  providers:[
    AuthGuard
  ]
})
export class TasksModule { }
