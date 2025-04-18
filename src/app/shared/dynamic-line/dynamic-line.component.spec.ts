import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLineComponent } from './dynamic-line.component';

describe('DynamicLineComponent', () => {
  let component: DynamicLineComponent;
  let fixture: ComponentFixture<DynamicLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
