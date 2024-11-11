import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./modules/signup/page/signup.component";
import {ChooseSignupMethodComponent} from "./modules/choose-signup-method/page/choose-signup-method.component";

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'choose-signup-method',
    component: ChooseSignupMethodComponent,
    loadChildren: () => import('./modules/choose-signup-method/choose-signup-method.module').then(m => m.ChooseSignupMethodModule)
  },
  { path: '**', redirectTo: 'choose-signup-method'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
