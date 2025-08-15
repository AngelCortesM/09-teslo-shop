import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from '@products/components/product-table/product-table';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { Product } from '@products/interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
  styleUrl: './products-admin-page.css',
})
export class ProductsAdminPage {
  paginationService = inject(PaginationService);
  productsService = inject(ProductsService);
  productsPerPage = signal(10);

  constructor() {
    // Escuchar cambios en la señal
    effect(() => {
      console.log('Nuevo valor de productsPerPage:', this.productsPerPage());
    });
  }

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.productsPerPage(),
    }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9 - 9,
        limit: params.limit,
      });
    },
  });
}
