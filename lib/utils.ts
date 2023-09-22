"use client";
import { sha256 } from "multiformats/hashes/sha2";

export async function hashData(data: Uint8Array): Promise<Uint8Array> {
    let hasher = await sha256.digest(data);
    return hasher.digest;
}

export function buildPaymentContractParams(storePaymentAddress: string, amount: string, hashedData: string) {
    const PaymentProof = "0x0000000000000000000000000000000000000000" // Blank proof
    const Currency = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC
    return [
        storePaymentAddress,
        PaymentProof,
        amount,
        Currency,
        hashedData
    ]
}

export const PaymentFactoryContractAddress = "0xe7eD90d1EF91C23EE8531567419CC5554a4303b6";
export const PaymentFactoryFunctionName = "getPaymentAddress";
