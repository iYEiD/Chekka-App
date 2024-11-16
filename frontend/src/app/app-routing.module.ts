import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./ui/modules/authentication/page/auth.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    component: AuthComponent,
    loadChildren: () => import('./ui/modules/authentication/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
