
const DEFAULT_PAYMENT_PROOF_ADDRESS = "0x0000000000000000000000000000000000000000" // Blank proof
const USDC_CURRENCY_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC

const ETHERSCAN_API_KEY = "BPPR4YEESP9GSPKCE2EEKRMMVFPZAIGI4J";
const ETHERSCAN_API_URL = "https://api-sepolia.etherscan.io/api";


export function buildPaymentConfirmationURL(address: string) {
    return `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
}

export function buildPaymentContractParams(storePaymentAddress: string, amount: string, hashedData: string) {

    return [
        storePaymentAddress,
        DEFAULT_PAYMENT_PROOF_ADDRESS,
        amount,
        USDC_CURRENCY_ADDRESS,
        hashedData
    ]
}


export const PaymentFactoryContractAddress = "0xe7eD90d1EF91C23EE8531567419CC5554a4303b6";
export const PaymentFactoryFunctionName = "getPaymentAddress";
