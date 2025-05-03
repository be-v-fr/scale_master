import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubmenuComponent } from './dialog-submenu.component';

describe('DialogSubmenuComponent', () => {
  let component: DialogSubmenuComponent;
  let fixture: ComponentFixture<DialogSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSubmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
