import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFilter'
})
export class CardFilterPipe implements PipeTransform {

  transform(items: any[], field:string, value: string): any[] {

  if(!items) return [];
  if(!value) return items;

  return items.filter( str => {
        return str[field].toLowerCase().includes(value.toLowerCase());
      });
 }

}
