import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModesComponent } from './dialog-modes.component';

describe('DialogModesComponent', () => {
  let component: DialogModesComponent;
  let fixture: ComponentFixture<DialogModesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
