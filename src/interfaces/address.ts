/**
 * Represents an address for legal information.
 */
export interface Address {
    name: string,
    street: string,
    city: string,
    country: string,
    contact: {
        phone: string,
        email: {
            name: string,
            provider: string
        }
    }
}