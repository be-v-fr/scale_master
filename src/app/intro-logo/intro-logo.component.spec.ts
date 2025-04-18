import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroLogoComponent } from './intro-logo.component';

describe('IntroLogoComponent', () => {
  let component: IntroLogoComponent;
  let fixture: ComponentFixture<IntroLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
