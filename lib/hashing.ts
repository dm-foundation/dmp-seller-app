"use client";
import { sha256 } from "multiformats/hashes/sha2";

export async function sha256Hash(data: Uint8Array): Promise<Uint8Array> {
    let hasher = await sha256.digest(data);
    return hasher.digest;
}
