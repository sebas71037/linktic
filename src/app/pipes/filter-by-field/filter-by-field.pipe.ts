import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByField'
})
export class FilterByFieldPipe implements PipeTransform {

  transform<T>(items: T[] | null, searchText: string, field: string): T[] {
    if (!items) return [];
    
    if (!searchText || !field) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const itemField = item[field as keyof T]?.toString().toLowerCase() || '';
      return itemField.includes(searchText);
    });
  }

}
