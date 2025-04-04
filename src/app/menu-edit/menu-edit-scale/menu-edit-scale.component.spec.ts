import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditScaleComponent } from './menu-edit-scale.component';

describe('MenuEditScaleComponent', () => {
  let component: MenuEditScaleComponent;
  let fixture: ComponentFixture<MenuEditScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuEditScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
