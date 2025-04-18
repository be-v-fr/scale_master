export function equalItems<T>(arr1: T[], arr2: T[]) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    if (set1.size !== set2.size) return false;
    for (const value of set1) {
      if (!set2.has(value)) return false;
    }
    return true;
}