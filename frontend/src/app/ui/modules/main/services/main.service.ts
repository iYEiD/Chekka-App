import {inject, Injectable, signal} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isNavbarFunctioningDisabled = signal<boolean>(false)
  router = inject(Router)

  constructor() { }

  changeNavbarStatus() {
    let currentUrl = this.router.url
    if (currentUrl === '/app/parking-spots' || currentUrl === '/app/map') {
      this.isNavbarFunctioningDisabled.set(false)
    } else {
      this.isNavbarFunctioningDisabled.set(true)
    }
  }
}
