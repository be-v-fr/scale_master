import { ScaleCategory } from "../../interfaces/scale-category";

export const DIATONIC: ScaleCategory = {
  name: 'Diatonic',
  intervals: [0, 2, 4, 5, 7, 9, 11],
  modes: [
    {
      name: 'Major',
      interval: 0,
    },
    {
      name: 'Minor',
      interval: 9,
    },
    {
      name: 'Dorian',
      interval: 2,
    },
    {
      name: 'Phrygian',
      interval: 4,
    },
    {
      name: 'Lydian',
      interval: 5,
    },
    {
      name: 'Mixolydian',
      interval: 7,
    },
    {
      name: 'Locrian',
      interval: 11,
    },
  ]
};
