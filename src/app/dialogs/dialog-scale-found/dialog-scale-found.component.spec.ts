import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScaleFoundComponent } from './dialog-scale-found.component';

describe('DialogScaleFoundComponent', () => {
  let component: DialogScaleFoundComponent;
  let fixture: ComponentFixture<DialogScaleFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogScaleFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogScaleFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
