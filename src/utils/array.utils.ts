export function equalItems<T>(arr1: T[], arr2: T[]): boolean {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  if (set1.size !== set2.size) return false;
  for (const value of set1) {
    if (!set2.has(value)) return false;
  }
  return true;
}


export function getIncrementalArray(length: number): number[] {
  return Array.from({ length: length }, (_: void, index: number) => index + 1);
}


function getSemitoneOptions(): number[] {
  const length = 11;
  const positives: number[] = getIncrementalArray(length);
  const negatives: number[] = new Array<number>(length);
  positives.forEach((semitone: number, index: number) => {
    negatives[length - index - 1] = -semitone;
  });
  return negatives.concat([0]).concat(positives);
}


export const SEMITONE_OPTIONS: number[] = getSemitoneOptions();