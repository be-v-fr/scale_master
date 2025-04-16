import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNameScaleComponent } from './dialog-name-scale.component';

describe('DialogNameScaleComponent', () => {
  let component: DialogNameScaleComponent;
  let fixture: ComponentFixture<DialogNameScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNameScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNameScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
