import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOpenScaleComponent } from './dialog-open-scale.component';

describe('DialogOpenScaleComponent', () => {
  let component: DialogOpenScaleComponent;
  let fixture: ComponentFixture<DialogOpenScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOpenScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogOpenScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
