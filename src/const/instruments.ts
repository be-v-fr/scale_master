import { Instrument } from "../interfaces/instrument";
import { BANJO } from "./instruments/banjo";
import { BASS } from "./instruments/bass";
import { GUITAR } from "./instruments/guitar";
import { MANDOLIN } from "./instruments/mandolin";
import { CELLO, DOUBLE_BASS, VIOLA, VIOLIN } from "./instruments/orchestra";
import { SITAR } from "./instruments/sitar";
import { UKULELE } from "./instruments/ukulele";

export const INSTRUMENTS: Instrument[] = [
    GUITAR,
    BASS,
    UKULELE,
    BANJO,
    VIOLIN,
    VIOLA,
    CELLO,
    DOUBLE_BASS,
    // dulcimer
    // lute
    MANDOLIN,
    // balalaika,
    // bouzouki
    // oud: (f),c,g,d,a,g / https://www.ethnicmusical.com/oud/how-to-tune-the-oud/?srsltid=AfmBOop-5chILqg93wAS9yvLJc9LkzKhc2-4igNLL6pZzQtqsXSwl8IQ
    SITAR,
];