import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeadlineBarComponent } from './main-headline-bar.component';

describe('MainHeadlineBarComponent', () => {
  let component: MainHeadlineBarComponent;
  let fixture: ComponentFixture<MainHeadlineBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHeadlineBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainHeadlineBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
