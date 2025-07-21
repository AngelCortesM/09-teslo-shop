import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCarousel } from './producto-carousel';

describe('ProductoCarousel', () => {
  let component: ProductoCarousel;
  let fixture: ComponentFixture<ProductoCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
