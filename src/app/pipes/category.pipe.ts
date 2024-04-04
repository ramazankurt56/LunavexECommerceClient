import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {
  transform(value: CategoryModel[], searchTerm: string): CategoryModel[] {
    console.log(value); // Check the value array here
    if (searchTerm === "") {
      return value;
    }
    return value.filter(p =>
      p.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }
}