import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOpenItemComponent } from './dialog-open-item.component';

describe('DialogOpenItemComponent', () => {
  let component: DialogOpenItemComponent;
  let fixture: ComponentFixture<DialogOpenItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOpenItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogOpenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
