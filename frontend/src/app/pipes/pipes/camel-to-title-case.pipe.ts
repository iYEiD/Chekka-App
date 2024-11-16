import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitleCase'
})
export class CamelToTitleCasePipe implements PipeTransform {

  constructor() { }

  transform(obj: string): string {
    const result = obj.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }


}
