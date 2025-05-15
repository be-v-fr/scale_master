/**
 * Represents a data save of an arbitrary type.
 * Is saved together with a timestamp for unqiue identification.
 */
export interface StorageSave<T> {
    data: T,
    timestamp: number
}