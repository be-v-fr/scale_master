import { Instrument } from "../interfaces/instrument";
import { BALALAIKA } from "./instruments/balalaika";
import { BANJO } from "./instruments/banjo";
import { BASS } from "./instruments/bass";
import { BOUZOUKI_GREEK } from "./instruments/bouzouki-greek";
import { BOUZOUKI_IRISH } from "./instruments/bouzouki-irish";
import { DULCIMER } from "./instruments/dulcimer";
import { ERHU } from "./instruments/erhu";
import { GUITAR } from "./instruments/guitar";
import { LIUQIN } from "./instruments/liuqin";
import { LUTE } from "./instruments/lute";
import { MANDOLIN } from "./instruments/mandolin";
import { CELLO, DOUBLE_BASS, VIOLA, VIOLIN } from "./instruments/orchestra";
import { OUD } from "./instruments/oud";
import { PIPA } from "./instruments/pipa";
import { SITAR } from "./instruments/sitar";
import { UKULELE } from "./instruments/ukulele";
import { ZHONGRUAN } from "./instruments/zhongruan";

export const INSTRUMENTS: Instrument[] = [
    GUITAR,
    BASS,
    UKULELE,
    VIOLIN,
    VIOLA,
    CELLO,
    DOUBLE_BASS,
    BANJO,
    MANDOLIN,
    BALALAIKA,
    BOUZOUKI_GREEK,
    BOUZOUKI_IRISH,
    OUD,
    SITAR,
    DULCIMER,
    LUTE,
    ERHU,
    LIUQIN,
    PIPA,
    ZHONGRUAN
];