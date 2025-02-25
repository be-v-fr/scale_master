import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableListItemComponent } from './scrollable-list-item.component';

describe('ScrollableListItemComponent', () => {
  let component: ScrollableListItemComponent;
  let fixture: ComponentFixture<ScrollableListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
