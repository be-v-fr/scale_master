import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTuningFoundComponent } from './dialog-tuning-found.component';

describe('DialogTuningFoundComponent', () => {
  let component: DialogTuningFoundComponent;
  let fixture: ComponentFixture<DialogTuningFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTuningFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogTuningFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
