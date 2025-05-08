import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandBtnComponent } from './expand-btn.component';

describe('ExpandBtnComponent', () => {
  let component: ExpandBtnComponent;
  let fixture: ComponentFixture<ExpandBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpandBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
