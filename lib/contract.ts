
const PaymentProof = "0x0000000000000000000000000000000000000000" // Blank proof
const Currency = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC

export function buildPaymentContractParams(storePaymentAddress: string, amount: string, hashedData: string) {

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
