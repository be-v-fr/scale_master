import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreMenuComponent } from './more-menu.component';

describe('MoreMenuComponent', () => {
  let component: MoreMenuComponent;
  let fixture: ComponentFixture<MoreMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
