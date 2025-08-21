import { Pipe, PipeTransform } from '@angular/core';
const baseUrl = 'https://one0-nest-teslo-shop-backend-qjr4.onrender.com/api/files/product/';
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if (value === null) {
      return 'assets/images/no-image.jpg';
    }
    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
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
