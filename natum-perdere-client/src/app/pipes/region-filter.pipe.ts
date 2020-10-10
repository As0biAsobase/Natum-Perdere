import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionFilter'
})
export class RegionFilterPipe implements PipeTransform {

  transform(items: any[], field:string, value: string): any[] {

  if(!items) return [];
  if(!value) return items;

  return items.filter( str => {
        return items;
        // return str[field].toLowerCase().includes(value.toLowerCase());
      });
 }
}
