import { Routes } from '@angular/router';
import { StoreFrontLayout } from './layouts/store-front-layout/store-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { GenderPage } from './pages/gender-page/gender-page';
import { ProductPage } from './pages/product-page/product-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { StoreFrontGuard } from '@auth/guards/store-front.guard';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'gender/:gender',
        component: GenderPage,
        canMatch: [StoreFrontGuard],
      },
      {
        path: 'product/:idSlug',
        component: ProductPage,
        canMatch: [StoreFrontGuard],
      },
      {
        path: '**',
        component: NotFoundPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
export default storeFrontRoutes;
