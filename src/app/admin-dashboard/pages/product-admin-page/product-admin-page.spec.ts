import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminPage } from './product-admin-page';

describe('ProductAdminPage', () => {
  let component: ProductAdminPage;
  let fixture: ComponentFixture<ProductAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
