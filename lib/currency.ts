const CryptoConvert = require("crypto-convert").default;

class CryptoConverter {

    private static instance: CryptoConverter;

    private constructor() {
    }

    public static getInstance(): any {
        if (!CryptoConverter.instance) {
            CryptoConverter.instance = new CryptoConvert();
        }
        return CryptoConverter.instance;
    }
}

export default CryptoConverter;