const CryptoConvert = require("crypto-convert").default;
const Web3 = require('web3');
const convert = new CryptoConvert();

class CryptoConverter {

    public static convertUSDtoETH = async (amountInUSD: number) => {
        await convert.ready();
        console.log("convert.USD.ETH(amountInUSD): ", convert.USD.ETH(amountInUSD));
        return await convert.USD.ETH(amountInUSD);
    }

    public static convertETHtoWei = async function (amountInEth: number) {
        console.log("amountInEth: ", amountInEth);
        return await Web3.utils.toWei(amountInEth, 'ether');
    }
}



export default CryptoConverter;