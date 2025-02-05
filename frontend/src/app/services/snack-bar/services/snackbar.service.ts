import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {SnackbarTypeEnums} from "../enum/snackbar-type.enums";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBarService: NzMessageService) { }

  openSnackBar(type: SnackbarTypeEnums, message: string, duration?: number) {
    this.snackBarService.create(type, message, {
      nzDuration: duration ? duration: 5000
    })
  }
}
