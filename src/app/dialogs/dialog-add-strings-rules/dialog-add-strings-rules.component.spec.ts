import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStringsRulesComponent } from './dialog-add-strings-rules.component';

describe('DialogAddStringsRulesComponent', () => {
  let component: DialogAddStringsRulesComponent;
  let fixture: ComponentFixture<DialogAddStringsRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddStringsRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddStringsRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
