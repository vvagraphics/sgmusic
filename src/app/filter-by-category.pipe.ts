import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './components/product/product.model';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(products: Product[], category: string): Product[] {
    if (!products || !category) {
      return products;
    }
    return products.filter(product => product.category === category);
  }

}
