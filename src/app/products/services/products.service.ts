import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { environment } from '@environments/environment';
import {
  Gender,
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { catchError, count, Observable, of, tap } from 'rxjs';

const baseUrl = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}
const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly productsCache = new Map<string, ProductsResponse>();
  private readonly productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;
    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }
    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          ...(limit && { limit }),
          ...(offset && { offset }),
          ...(gender && { gender }),
        },
      })
      .pipe(
        tap((response) => {
          console.log('Products fetched:', response);
        }),
        tap((response) => {
          this.productsCache.set(key, response);
        })
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      tap((response) => {
        console.log('Product fetched by slug:', response);
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') return of(emptyProduct);
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }
    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      tap((response) => {
        console.log('Product fetched by slug:', response);
      })
    );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product | string> {
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(
        tap((product) => this.updateProductCache(id, product)),
        catchError((err) => of('Error de la base de datos ', err))
      );
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${baseUrl}/products`, productLike).pipe(
      tap((product) => this.updateProductCache(product.id, product)),
      catchError((err) => of('Error de la base de datos ', err))
    );
  }

  updateProductCache(id: string, product: Product) {
    this.productCache.set(id, product);
    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currectProduct) => {
          return currectProduct.id === product.id ? product : currectProduct;
        }
      );
    });
  }
}
