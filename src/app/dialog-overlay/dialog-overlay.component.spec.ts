import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverlayComponent } from './dialog-overlay.component';

describe('DialogOverlayComponent', () => {
  let component: DialogOverlayComponent;
  let fixture: ComponentFixture<DialogOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
