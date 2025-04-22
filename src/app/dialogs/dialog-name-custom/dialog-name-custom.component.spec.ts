import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNameCustomComponent } from './dialog-name-custom.component';

describe('DialogNameCustomComponent', () => {
  let component: DialogNameCustomComponent;
  let fixture: ComponentFixture<DialogNameCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNameCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogNameCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
