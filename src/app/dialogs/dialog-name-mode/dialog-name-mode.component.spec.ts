import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNameModeComponent } from './dialog-name-mode.component';

describe('DialogNameModeComponent', () => {
  let component: DialogNameModeComponent;
  let fixture: ComponentFixture<DialogNameModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNameModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNameModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
