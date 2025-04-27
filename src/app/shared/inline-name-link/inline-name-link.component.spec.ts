import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineNameLinkComponent } from './inline-name-link.component';

describe('InlineNameLinkComponent', () => {
  let component: InlineNameLinkComponent;
  let fixture: ComponentFixture<InlineNameLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineNameLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InlineNameLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
