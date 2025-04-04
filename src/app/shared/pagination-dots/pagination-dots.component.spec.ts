import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationDotsComponent } from './pagination-dots.component';

describe('PaginationDotsComponent', () => {
  let component: PaginationDotsComponent;
  let fixture: ComponentFixture<PaginationDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationDotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
