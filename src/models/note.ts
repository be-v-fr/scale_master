export class Note {
    readonly NOTES = [
        {
            natural: 'a',
            sharp: 'gx',
            flat: 'bbb'
        },

        {
            natural: 'a#',
            sharp: 'a#',
            flat: 'bb'
        },

        {
            natural: 'b',
            sharp: 'ax',
            flat: 'cb'
        },

        {
            natural: 'c',
            sharp: 'b#',
            flat: 'dbb'
        },

        {
            natural: 'c#',
            sharp: 'c#',
            flat: 'db'
        },

        {
            natural: 'd',
            sharp: 'cx',
            flat: 'ebb'
        },

        {
            natural: 'd#',
            sharp: 'd#',
            flat: 'eb'
        },

        {
            natural: 'e',
            sharp: 'dx',
            flat: 'fb'
        },

        {
            natural: 'f',
            sharp: 'e#',
            flat: 'gbb'
        },

        {
            natural: 'f#',
            sharp: 'ex',
            flat: 'gb'
        },

        {
            natural: 'g',
            sharp: 'fx',
            flat: 'abb'
        },

        {
            natural: 'g#',
            sharp: 'g#',
            flat: 'ab'
        },
    ];

    index: number;
    accidental: 'natural' | 'sharp' | 'flat';
    name: string;

    constructor(index: number, accidental?: 'natural' | 'sharp' | 'flat') {
        this.index = index;
        if (accidental) {
            this.accidental = accidental;
        } else {
            this.accidental = 'natural';
        }
        this.name = this.NOTES[index][this.accidental];
        if(!this.name) {
            console.error('Note broken or not found in NOTES.')
        }
    }

    print() {
        return this.capitalizeFirstLetter(this.name);
    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}