import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoadFretboardComponent } from './dialog-load-fretboard.component';

describe('DialogLoadFretboardComponent', () => {
  let component: DialogLoadFretboardComponent;
  let fixture: ComponentFixture<DialogLoadFretboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLoadFretboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogLoadFretboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
