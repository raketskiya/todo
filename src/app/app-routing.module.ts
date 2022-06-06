import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './modules/auth/components/auth/auth.component';
import {TasksComponent} from './modules/tasks/components/tasks/tasks.component';

const routes: Routes = [
  {path:'', component: AuthComponent},
  {path:'tasks', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
