/**
 * Represents ordering settings for data arrays.
 */
export interface Ordering {
    order: 'desc' | 'asc';
    orderingBy: 'name' | 'createdAt';
}