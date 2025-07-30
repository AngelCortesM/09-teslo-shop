import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAdminPage } from './products-admin-page';

describe('ProductsAdminPage', () => {
  let component: ProductsAdminPage;
  let fixture: ComponentFixture<ProductsAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
