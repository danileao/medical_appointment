

export interface CryptInterface {
    hash(value: string): void;
    compare(first: string, second: string): void;
}   