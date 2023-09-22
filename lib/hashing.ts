import { sha256 } from "multiformats/hashes/sha2";

export async function sha256Hash(data: Uint8Array): Promise<Uint8Array> {
    try {
        console.log(data);
        console.log(sha256);
        let hasher = await sha256.digest(data);
        return await hasher.digest;
    } catch (e) {
        console.log("Something went wrong when hashing cart", e);
        return new Uint8Array();
    }

}
