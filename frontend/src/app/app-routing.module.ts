import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./ui/modules/authentication/page/auth.component";
import {MainComponent} from "./ui/modules/main/page/main.component";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./ui/modules/authentication/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app',
    component: MainComponent,
    loadChildren: () => import('./ui/modules/main/main.module').then(m => m.MainModule)
  },
  { path: '**', redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
