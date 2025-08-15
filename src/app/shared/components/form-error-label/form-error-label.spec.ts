import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorLabel } from './form-error-label';

describe('FormErrorLabel', () => {
  let component: FormErrorLabel;
  let fixture: ComponentFixture<FormErrorLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorLabel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
