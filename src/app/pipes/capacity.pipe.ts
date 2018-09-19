import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capacity'
})
export class CapacityPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    let unit = 'B';
    let t = value;
    let n = Math.floor(t / 1024);
    if (n >= 1) {
      t = n;
      unit = 'KB';
      n = Math.floor(t / 1024);
      if (n >= 1) {
        t = n;
        unit = 'MB';
        n = Math.floor(t / 1024);
        if (n >= 1) {
          t = n;
          unit = 'GB';
        }

      }
    }
    return t + unit;
  }

}
