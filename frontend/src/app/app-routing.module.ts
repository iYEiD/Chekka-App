import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./ui/modules/authentication/signup/page/signup.component";

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    loadChildren: () => import('./ui/modules/authentication/signup/signup.module').then(m => m.SignupModule)
  },
  { path: '**', redirectTo: 'signup'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
