const CryptoConvert = require("crypto-convert").default;
const convert = new CryptoConvert();
await convert.ready();

const Web3 = require('web3');

class CryptoConverter {

    public static convertUSDtoETH = async (amountInUSD: number) => {
        const amountInEth = await convert.USD.ETH(amountInUSD);
        console.log("convertUSDtoETH: ", amountInEth);
        return amountInEth;
    }

    public static convertETHtoWei = async function (amountInEth: number) {
        const amountInWei = await Web3.utils.toWei(amountInEth, 'ether')
        console.log("convertETHtoWei: ", amountInWei);
        return amountInWei;
    }
}



export default CryptoConverter;