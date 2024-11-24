import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParkingSpotsComponent} from "../pages/parking-spots/page/parking-spots.component";
import {ParkingSpotDetailsComponent} from "../pages/parking-spot-details/page/parking-spot-details.component";
import {AccountComponent} from "../pages/account/page/account.component";
import {MapComponent} from "../pages/map/page/map.component";

const routes: Routes = [
  {
    path: 'parking-spots',
    component: ParkingSpotsComponent,
    loadChildren: () => import('../pages/parking-spots/parking-spots.module').then(m => m.ParkingSpotsModule)
  },
  {
    path: 'parking-spots/:ID',
    component: ParkingSpotDetailsComponent,
    loadChildren: () => import('../pages/parking-spot-details/parking-spot-details.module').then(m => m.ParkingSpotDetailsModule)
  },
  {
    path: 'account',
    component: AccountComponent,
    loadChildren: () => import('../pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'map',
    component: MapComponent,
    loadChildren: () => import('../pages/map/map.module').then(m => m.MapModule)
  },
  { path: '**', redirectTo: 'parking-spots'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
