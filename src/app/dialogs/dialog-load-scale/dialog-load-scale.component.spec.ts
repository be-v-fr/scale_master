import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoadScaleComponent } from './dialog-load-scale.component';

describe('DialogLoadScaleComponent', () => {
  let component: DialogLoadScaleComponent;
  let fixture: ComponentFixture<DialogLoadScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLoadScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogLoadScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
