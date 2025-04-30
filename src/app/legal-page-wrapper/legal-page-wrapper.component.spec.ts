import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPageWrapperComponent } from './legal-page-wrapper.component';

describe('LegalPageWrapperComponent', () => {
  let component: LegalPageWrapperComponent;
  let fixture: ComponentFixture<LegalPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalPageWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
