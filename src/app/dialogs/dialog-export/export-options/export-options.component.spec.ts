import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportOptionsComponent } from './export-options.component';

describe('ExportOptionsComponent', () => {
  let component: ExportOptionsComponent;
  let fixture: ComponentFixture<ExportOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
