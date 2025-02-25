import { NOTES } from "../const/notes";

export class Note {
    index: number;
    accidental: 'natural' | 'sharp' | 'flat';
    name: string;

    constructor(index: number, accidental?: 'natural' | 'sharp' | 'flat') {
        this.index = index;
        this.accidental = accidental ? accidental : 'natural';
        this.name = NOTES[index][this.accidental];
        if (!this.name) {
            console.error('Note broken or not found.')
        }
    }

    print() {
        return this.capitalizeFirstLetter(this.name);
    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getIntervalIndex(interval: number) {
        return (this.index + interval) % 12;
    }
}