import { Pipe, PipeTransform } from '@angular/core';
const baseUrl = 'http://localhost:3000/api/files/product/';
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if (value === null) {
      return 'assets/images/no-image.jpg';
    }
    // array > 1 = primer elemento
    if (Array.isArray(value) && value.length > 0) {
      return `${baseUrl}${value[0]}`;
    }
    //string = string
    if (typeof value === 'string') {
      return `${baseUrl}${value}`;
    }
    //placeholder image
    return 'assets/images/no-image.jpg';
  }
}
