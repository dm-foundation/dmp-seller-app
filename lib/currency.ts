const CryptoConvert = require("crypto-convert").default;
const convert = new CryptoConvert();
// await convert.ready();

const Web3 = require('web3');

class CryptoConverter {

    public static convertUSDtoETH = async (amountInUSD: number) => {
        console.log("convert.USD.ETH(amountInUSD): ", convert.USD.ETH(amountInUSD));
        return await convert.USD.ETH(amountInUSD);
    }

    public static convertETHtoWei = async function (amountInEth: number) {
        console.log("amountInEth: ", amountInEth);
        return await Web3.utils.toWei(amountInEth, 'ether');
    }
}



export default CryptoConverter;