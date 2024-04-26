import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterStatusPage } from './counter-status.page';

describe('CounterStatusPage', () => {
  let component: CounterStatusPage;
  let fixture: ComponentFixture<CounterStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
