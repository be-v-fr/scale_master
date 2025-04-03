import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-export-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-options.component.html',
  styleUrl: './export-options.component.scss'
})
export class ExportOptionsComponent {
  @Input({ required: true }) fileName?: string;
  @Input() fileUrl?: string;
}
