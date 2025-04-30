import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineBackBtnComponent } from './headline-back-btn.component';

describe('HeadlineBackBtnComponent', () => {
  let component: HeadlineBackBtnComponent;
  let fixture: ComponentFixture<HeadlineBackBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineBackBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadlineBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
