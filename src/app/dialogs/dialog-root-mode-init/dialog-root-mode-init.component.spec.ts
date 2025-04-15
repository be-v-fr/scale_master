import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRootModeInitComponent } from './dialog-root-mode-init.component';

describe('DialogRootModeInitComponent', () => {
  let component: DialogRootModeInitComponent;
  let fixture: ComponentFixture<DialogRootModeInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRootModeInitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogRootModeInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
