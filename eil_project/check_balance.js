const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    // 1. 連接到兩條鏈
    const opProvider = new ethers.JsonRpcProvider(process.env.OP_RPC_URL);
    const arbProvider = new ethers.JsonRpcProvider(process.env.ARB_RPC_URL);

    // 2. 建立錢包物件 (同一個私鑰)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    console.log(`👤 你的錢包地址: ${wallet.address}`);

    // 3. 檢查 OP 餘額
    const opBalance = await opProvider.getBalance(wallet.address);
    console.log(`🔴 OP Sepolia 餘額: ${ethers.formatEther(opBalance)} ETH`);

    // 4. 檢查 Arb 餘額
    const arbBalance = await arbProvider.getBalance(wallet.address);
    console.log(`🔵 Arb Sepolia 餘額: ${ethers.formatEther(arbBalance)} ETH`);
}

main().catch((error) => {
    console.error("❌ 發生錯誤:", error);
});