import { ScaleCategory } from "../../interfaces/scale-category";

export const AUGMENTED: ScaleCategory = {
  name: 'Augmented',
  intervals: [0, 2, 4, 5, 8, 9, 11],
  modes: [
    {
      name: 'Major',
      interval: 0,
    },
    {
      name: 'Harmonic Minor',
      interval: 9,
    },
    {
      name: 'Romanian Minor',
      interval: 2,
    },
    {
      name: 'Freygish',
      interval: 4,
    },
    {
      name: 'Lydian',
      interval: 5,
    },
    {
      name: 'Super-Locrian',
      interval: 8,
    },
    {
      name: 'Locrian',
      interval: 11,
    },
  ]
};
