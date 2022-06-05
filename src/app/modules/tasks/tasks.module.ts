import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksComponent} from './components/tasks/tasks.component';
import {AddTaskFormComponent} from './components/add-task-form/add-task-form.component';
import {TaskComponent} from './components/task/task.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    TasksComponent,
    AddTaskFormComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
