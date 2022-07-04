import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';
import { ThemeComponent } from './shared/components/theme/theme.component';

const routes: Routes = [
  { path: 'sighIn', component: SignInComponent },
  { path: 'sighUp', component: SignUpComponent },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
    data: { breadcrumb: 'Tasks' },
  },
  { path: '**', redirectTo: 'sighIn', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
