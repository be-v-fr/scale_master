/*
 * Compares two arrays for equality by content, ignoring order.
 */
export function equalItems<T>(arr1: T[], arr2: T[]): boolean {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  if (set1.size !== set2.size) return false;
  for (const value of set1) {
    if (!set2.has(value)) return false;
  }
  return true;
}


/*
 * Returns an array [1, 2, ..., length].
 */
export function getIncrementalArray(length: number): number[] {
  return Array.from({ length: length }, (_: void, index: number) => index + 1);
}


/*
 * Generates an array of semitone shifts from -11 to 11.
 */
function getSemitoneOptions(): number[] {
  const length = 11;
  const positives: number[] = getIncrementalArray(length);
  const negatives: number[] = new Array<number>(length);
  positives.forEach((semitone: number, index: number) => {
    negatives[length - index - 1] = -semitone;
  });
  return negatives.concat([0]).concat(positives);
}


/*
 * Precomputed array of semitone options from -11 to 11.
 */
export const SEMITONE_OPTIONS: number[] = getSemitoneOptions();