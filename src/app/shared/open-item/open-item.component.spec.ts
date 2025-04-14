import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenItemComponent } from './open-item.component';

describe('OpenItemComponent', () => {
  let component: OpenItemComponent;
  let fixture: ComponentFixture<OpenItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
