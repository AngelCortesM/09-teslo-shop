import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFrontLayout } from './store-front-layout';

describe('StoreFrontLayout', () => {
  let component: StoreFrontLayout;
  let fixture: ComponentFixture<StoreFrontLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFrontLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFrontLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
