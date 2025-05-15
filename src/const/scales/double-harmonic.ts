import { ScaleCategory } from "../../interfaces/scale-category";

export const DOUBLE_HARMONIC: ScaleCategory = {
  name: 'Double Harmonic',
  intervals: [0, 1, 4, 5, 7, 8, 11],
  modes: [
    {
      name: 'Major',
      interval: 0,
    },
    {
      name: 'Lydian',
      interval: 1,
    },
    {
      name: 'Ultraphrygian',
      interval: 4,
    },
    {
      name: 'Hungarian Minor',
      interval: 5,
    },
    {
      name: 'Oriental',
      interval: 7,
    },
    {
      name: 'Ionian',
      interval: 8,
    },
    {
      name: 'Locrian',
      interval: 11,
    },
  ]
};
