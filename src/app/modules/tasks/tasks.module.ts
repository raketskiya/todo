import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksComponent} from './components/tasks/tasks.component';
import {AddTaskComponent} from './components/add-task/add-task.component';
import {TaskComponent} from './components/task/task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ControlsModule} from '../../shared/controls/controls.module';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    TaskComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlsModule,
    RouterModule.forChild([
      {path: '', component: TasksComponent, canActivate: [AuthGuard]}
    ]),
    DragDropModule,
    MatExpansionModule
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
