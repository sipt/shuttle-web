import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ipsFormat'
})
export class IpsFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const arr = value as string[];
    let values = '';
    arr.forEach((v, i) => {
      if (i > 0) {
        values += ',';
      }
      values += `<div>${v}</div>`;
    });
    return values;
  }

}
