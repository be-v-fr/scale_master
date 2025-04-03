import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentFretboardService } from '../../services/current-fretboard.service';
import { DisplayService } from '../../services/display.service';
import { Note } from '../../models/note';

/**
 * Displays the fretboard with the currently selected scale as monospaced text.
 */
@Component({
  selector: 'app-fretboard-as-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fretboard-as-text.component.html',
  styleUrl: './fretboard-as-text.component.scss'
})
export class FretboardAsTextComponent implements OnInit {
  private _cols: number = 51;
  private _firstMarkFromLeft: number = this.display.lefty ? 10 : 16;
  private _marksDelta: number = 8;
  fretboardContent?: string;
  @Output() onFretboardInit: EventEmitter<string> = new EventEmitter<string>();
  fretboardInitComplete: boolean = false;

  /**
   * Constructor for injection of services.
   */
  constructor(
    public currFretboard: CurrentFretboardService,
    public display: DisplayService
  ) { }


  ngOnInit(): void {
    this.initFretboardContent();
  }


  get cols(): number {
    return this._cols;
  }


  initFretboardContent(): void {
    let content: string = '';
    for(let i = 0; i < this.currFretboard.fretboard.intervals.length; i++) {
      content += this.getInstrumentStringContent(i) + '\n';
    }
    content += this._fretboardMarks;
    this.handleFretboardContentEmission(content);
    this.fretboardContent = content;
  }


  private get _fretboardMarks(): string {
    let marks: string = ''
    for(let i = 0; i < this.cols; i++) {
      marks += this._isMarkedColumn(i) ? '.' : ' ';
    }
    return marks;
  }


  private _isMarkedColumn(col: number) {
    const markedColumns: Array<number> = [];
    for(let i = 0; i < 4; i++) {
      const columnIndex: number = this._firstMarkFromLeft + this._marksDelta * i;
      markedColumns.push(columnIndex);
    }
    return markedColumns.includes(col);
  }


  getInstrumentStringContent(stringIndex: number): string {
    return this.display.lefty ? this.getInstrumentStringContentLefty(stringIndex) : this.getInstrumentStringContentRighthanded(stringIndex);
  }


  getInstrumentStringContentRighthanded(stringIndex: number): string {
    let content: string = this.getInstrumentStringRoot(stringIndex).padEnd(3, ' ') + this.getOpenInstrumentStringNoteOrNone(stringIndex, 2) + '||';
    for(let fret = 1; fret < 12; fret++) {
        content += this.getFretNoteOrNone(stringIndex, fret) + '|';
    }
    return content;
  }


  getInstrumentStringContentLefty(stringIndex: number): string {
    let content: string = '';
    for(let fret = 1; fret < 12; fret++) {
        content += '|' + this.getFretNoteOrNone(stringIndex, fret);
    }
    content += '|| ' + this.getOpenInstrumentStringNoteOrNone(stringIndex, 4) + this.getInstrumentStringRoot(stringIndex).padEnd(2, ' ');
    return content;    
  }


  getInstrumentStringRoot(stringIndex: number): string {
    return this.currFretboard.notes[stringIndex].print();
  }


  getOpenInstrumentStringNoteOrNone(stringIndex: number, padTo: number): string {
    const note: Note | undefined = this.currFretboard.getNoteFromFret(stringIndex, 0);
    let value: string = note ? note.print() : '-';
    value = value.padEnd(padTo, ' ');
    return value;
  }


  getFretNoteOrNone(stringIndex: number, fret: number): string {
    const note: Note | undefined = this.currFretboard.getNoteFromFret(stringIndex, fret);
    let value: string = this.currFretboard.isRoot(stringIndex, fret) ? '>' : '-';
    value += note ? note.print() : '-';
    value = value.padEnd(3, '-');    
    return value;
  }


  handleFretboardContentEmission(content: string) {
    if(!this.fretboardInitComplete) {
      this.onFretboardInit.emit(content);
      this.fretboardInitComplete = true;
    }
  }
}
