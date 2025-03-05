import { NoteName } from "../interfaces/note-name";

/**
 * The entire note accidental logic of the app is based on the premise that for intervals which do
 * not exist without an accidental, the "natural" note name is set equal to the "sharp" note name.
 */
export const NOTES: Array<NoteName> = [
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