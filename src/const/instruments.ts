import { Instrument } from "../interfaces/instrument";

export const INSTRUMENTS: Instrument[] = [
    {
        name: 'guitar',
        tunings: [
            {
                name: 'standard',
                intervals: [0, 5, 10, 15, 19, 24],
                extraStrings: { interval: 5 }
            },

            {
                name: 'drop',
                intervals: [0, 7, 12, 17, 21, 26],
                extraStrings: {
                    interval: 5,
                    previousStringCorrection: 2
                }
            },

            {
                name: 'all fourths',
                intervals: [0, 5, 10, 15, 20, 25],
                extraStrings: { interval: 5 }
            },

            {
                name: 'open (Vestipol)',
                intervals: [0, 7, 12, 16, 19, 24],
                extraStrings: { interval: 5 }
            },

            {
                name: 'open (Spanish)',
                intervals: [0, 5, 12, 17, 21, 24],
                extraStrings: { interval: 5 }
            },
        ]
    },
    {
        name: 'bass', tunings: [
            {
                name: 'standard',
                intervals: [0, 5, 10, 15],
                extraStrings: { interval: 5 }
            },

            {
                name: 'drop',
                intervals: [0, 7, 12, 17],
                extraStrings: {
                    interval: 5,
                    previousStringCorrection: 2
                }
            }
        ]
    }
];