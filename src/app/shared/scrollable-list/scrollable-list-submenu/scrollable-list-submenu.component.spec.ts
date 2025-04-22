import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableListSubmenuComponent } from './scrollable-list-submenu.component';

describe('ScrollableListSubmenuComponent', () => {
  let component: ScrollableListSubmenuComponent;
  let fixture: ComponentFixture<ScrollableListSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableListSubmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollableListSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
