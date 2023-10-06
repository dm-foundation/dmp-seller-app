

const USDC_CURRENCY_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC
const ETH_CURRENCY_ADDRESS = "0x0000000000000000000000000000000000000000" // ETH

export const PaymentFactoryDefaultCurrency = 'USDC'

const CURRENCY_ADDRESS_DICT: { [key: string]: string } = {
    'USDC': USDC_CURRENCY_ADDRESS,
    'ETH': ETH_CURRENCY_ADDRESS
}

export function buildPaymentConfirmationURL(queryPath: string) {
    if (!queryPath) { return "" }
    const currencyName = queryPath[1];
    let actionParameter = currencyName === PaymentFactoryDefaultCurrency ? "tokentx" : "txlist";
    const URL = `${process.env.NEXT_PUBLIC_ETHERSCAN_SEPOLIA_API_URL}?module=account&action=${actionParameter}&address=${queryPath[0]}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    console.log("buildPaymentConfirmationURL", actionParameter, currencyName, URL);
    return URL;
}


export function buildPaymentURI(address: string, currencyName: string, amount: string) {
    if (currencyName == PaymentFactoryDefaultCurrency) {
        return `ethereum:${CURRENCY_ADDRESS_DICT[currencyName]}/transfer?address=${address}&uint256=${amount}`
    }
    return `ethereum:${address}?value=${amount}`
}

export function buildPaymentContractParams(storePaymentAddress: string, currencyName: string = PaymentFactoryDefaultCurrency, amount: string, hashedData: string): string[] {
    const currencyAddress = CURRENCY_ADDRESS_DICT[currencyName];

    return [
        storePaymentAddress,
        PaymentFactorySepoliaContractAddress,
        amount,
        currencyAddress,
        hashedData
    ]
}
export const PaymentFactoryDefaultProofAddress: string = "0x682dae06A708185F55E365eD939C74A8d36ce5A1"
export const PaymentFactorySepoliaContractAddress: `0x${string}` = "0xe7eD90d1EF91C23EE8531567419CC5554a4303b6";
export const PaymentFactoryMainnetContractAddress: `0x${string}` = "0x200ee24fd0d1a88e3b83de1da10b413963e1b2ea";
export const PaymentFactoryReadContractGetPaymentAddress: string = "getPaymentAddress";
