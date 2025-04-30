import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineBackComponent } from './headline-back.component';

describe('HeadlineBackComponent', () => {
  let component: HeadlineBackComponent;
  let fixture: ComponentFixture<HeadlineBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadlineBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
