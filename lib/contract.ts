
const DEFAULT_PAYMENT_PROOF_ADDRESS = "0x0000000000000000000000000000000000000000" // Blank proof
const USDC_CURRENCY_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC
const ETH_CURRENCY_ADDRESS = "0x0000000000000000000000000000000000000000" // ETH

const ETHERSCAN_API_KEY = "BPPR4YEESP9GSPKCE2EEKRMMVFPZAIGI4J";
// const ETHERSCAN_API_URL = "http://api-sepolia.etherscan.io/api";
const ETHERSCAN_API_URL = "http://etherscan.io/api";

const CURRENCY_ADDRESS_DICT: { [key: string]: string } = {
    'USDC': USDC_CURRENCY_ADDRESS,
    'ETH': ETH_CURRENCY_ADDRESS
}

const PAYMENT_FACTORY_ADDRESS_DICT: { [key: string]: string } = {
    'Sepolia': "0xe7eD90d1EF91C23EE8531567419CC5554a4303b6",
    'Mainnet': "0x200ee24fd0d1a88e3b83de1da10b413963e1b2ea"
}

export function buildPaymentConfirmationURL(address: string) {
    return `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`
}

export function buildPaymentContractParams(storePaymentAddress: string, amount: string, hashedData: string, currencyAddressKey: string = 'USDC') {
    const currencyAddress = CURRENCY_ADDRESS_DICT[currencyAddressKey];

    return [
        storePaymentAddress,
        DEFAULT_PAYMENT_PROOF_ADDRESS,
        amount,
        currencyAddress,
        hashedData
    ]
}


export const PaymentFactoryContractAddress = "0x200ee24fd0d1a88e3b83de1da10b413963e1b2ea"
export const PaymentFactoryFunctionName = "getPaymentAddress";
