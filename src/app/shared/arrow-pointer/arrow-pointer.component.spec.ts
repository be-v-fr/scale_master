import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowPointerComponent } from './arrow-pointer.component';

describe('ArrowPointerComponent', () => {
  let component: ArrowPointerComponent;
  let fixture: ComponentFixture<ArrowPointerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowPointerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowPointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
