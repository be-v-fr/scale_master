export const TUNINGS: Record<string, Record<string, number []>> = {
    guitar: {
        standard: [0, 5, 10, 15, 19, 24],
        drop: [0, 7, 12, 17, 21, 26],
        'open (Vestipol)': [0, 7, 12, 16, 19, 24],
        'open (Spanish)': [0, 5, 12, 17, 21, 24],
    },
    bass: {
        standard: [0, 5, 10, 15],
        drop: [0, 7, 12, 17],
    }
}