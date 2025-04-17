import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingBarComponent } from './ordering-bar.component';

describe('OrderingBarComponent', () => {
  let component: OrderingBarComponent;
  let fixture: ComponentFixture<OrderingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderingBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
