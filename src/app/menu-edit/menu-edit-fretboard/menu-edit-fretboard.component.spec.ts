import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditFretboardComponent } from './menu-edit-fretboard.component';

describe('MenuEditFretboardComponent', () => {
  let component: MenuEditFretboardComponent;
  let fixture: ComponentFixture<MenuEditFretboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditFretboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuEditFretboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
