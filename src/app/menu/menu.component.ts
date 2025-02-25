import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableListComponent } from './scrollable-list/scrollable-list.component';
import { Note } from '../../models/note';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ScrollableListComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  naturalNotes?: string[];

  ngOnInit(): void {
    this.loadNaturalNotes();
  }

  loadNaturalNotes(): void {
    const numberOfAllNotes: number = 12;
    this.naturalNotes = new Array(numberOfAllNotes);
    for(let i = 0; i < numberOfAllNotes; i++) {
      const note: Note = new Note(i, 'natural');
      this.naturalNotes[i] = note.print();
    }
  }
}
