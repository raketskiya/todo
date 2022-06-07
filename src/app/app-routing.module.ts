import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from './modules/auth/components/auth/auth.component';
import {TasksComponent} from './modules/tasks/components/tasks/tasks.component';

const routes: Routes = [
  {path:'sighIn', component: AuthComponent},
  {path:'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)},
  {path:'**', redirectTo: 'sighIn', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
