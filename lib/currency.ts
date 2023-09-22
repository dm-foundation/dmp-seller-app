const CryptoConvert = require("crypto-convert").default;

class CryptoConverter {

    private static instance: CryptoConverter;

    private constructor() {
        CryptoConverter.instance = new CryptoConvert();
    }

    private static getInstance(): any {
        if (CryptoConverter.instance == undefined) {
            CryptoConverter.instance = new CryptoConvert();
        }
        return CryptoConverter.instance;
    }

    public static convertUSDtoETH = async (amountInUSD: string) => {
        const converter = CryptoConverter.getInstance()
        await converter.ready();
        return await converter.USD.ETH(amountInUSD)
    }
}



export default CryptoConverter;