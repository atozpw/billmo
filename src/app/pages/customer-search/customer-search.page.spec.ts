import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSearchPage } from './customer-search.page';

describe('CustomerSearchPage', () => {
  let component: CustomerSearchPage;
  let fixture: ComponentFixture<CustomerSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
