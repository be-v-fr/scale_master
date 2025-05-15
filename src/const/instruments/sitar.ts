import { generateTuning } from "../../utils/tunings.utils";

export const SITAR = {
    name: 'Sitar',
    tunings: [
        generateTuning(['G', 'D', 'F#', 'A', 'D', 'D'], 'standard', 5),
    ],
    maxExtraStrings: 0
};