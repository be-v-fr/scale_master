import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardAsTextComponent } from './fretboard-as-text.component';

describe('FretboardAsTextComponent', () => {
  let component: FretboardAsTextComponent;
  let fixture: ComponentFixture<FretboardAsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretboardAsTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FretboardAsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
