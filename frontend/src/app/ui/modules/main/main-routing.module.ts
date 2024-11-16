import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParkingSpotsComponent} from "../pages/parking-spots/page/parking-spots.component";

const routes: Routes = [
  {
    path: 'parking-spots',
    component: ParkingSpotsComponent,
    loadChildren: () => import('../pages/parking-spots/parking-spots.module').then(m => m.ParkingSpotsModule)
  },
  { path: '**', redirectTo: 'parking-spots'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
