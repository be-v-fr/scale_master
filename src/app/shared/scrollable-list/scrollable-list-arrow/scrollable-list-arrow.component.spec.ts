import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableListArrowComponent } from './scrollable-list-arrow.component';

describe('ScrollableListArrowComponent', () => {
  let component: ScrollableListArrowComponent;
  let fixture: ComponentFixture<ScrollableListArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableListArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollableListArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
