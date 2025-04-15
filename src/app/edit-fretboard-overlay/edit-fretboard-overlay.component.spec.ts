import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFretboardOverlayComponent } from './edit-fretboard-overlay.component';

describe('EditFretboardOverlayComponent', () => {
  let component: EditFretboardOverlayComponent;
  let fixture: ComponentFixture<EditFretboardOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFretboardOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFretboardOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
