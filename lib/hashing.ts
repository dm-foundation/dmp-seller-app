import { sha256 } from 'js-sha256';

export function sha256Hasher(data: Uint8Array): string {
    try {
        return sha256(data);
    } catch (e) {
        console.log("Something went wrong when hashing cart", e);
        return "";
    }
}
