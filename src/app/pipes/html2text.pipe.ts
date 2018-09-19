import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'html2text'
})
export class Html2textPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (typeof value !== 'string') {
      return value;
  }
    const textParsed = value.replace(/(?:&)/g, '&amp;')
      .replace(/(?:")/g, '&quot;')
      .replace(/(?:<)/g,	'&lt;')
      .replace(/(?:>)/g,	'&gt;')
      .replace(/(?: )/g,	'&nbsp;');
    return textParsed;
  }
}
