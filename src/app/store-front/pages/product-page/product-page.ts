import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductoCarousel } from '@products/components/producto-carousel/producto-carousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductoCarousel],
  templateUrl: './product-page.html',
  styleUrls: ['./product-page.css'],
})
export class ProductPage {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => {
      return this.productsService.getProductByIdSlug(params.idSlug);
    },
  });
}
