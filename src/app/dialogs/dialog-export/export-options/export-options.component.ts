import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CopyToClipboardDirective } from '../../../../directives/copy-to-clipboard.directive';

@Component({
  selector: 'app-export-options',
  standalone: true,
  imports: [CommonModule, CopyToClipboardDirective],
  templateUrl: './export-options.component.html',
  styleUrl: './export-options.component.scss'
})
export class ExportOptionsComponent {
  @Input({ required: true }) fileName!: string;
  @Input() fileUrl?: string;
  @Output() copied: EventEmitter<void> = new EventEmitter();
}
