const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.OP_RPC_URL); // 改成 OP，因為合約在 OP
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const targetAddress = "0x525f430483d8e5dbf82C6704410aB8c3e88EF240";
    
    // 注意這裡：參數類型改成了 bytes
    const abi = ["function sendMessage(bytes calldata payload) external"]; 

    const contract = new ethers.Contract(targetAddress, abi, wallet);

    console.log("🚀 準備發送訊息至 EIL SourceContract...");

    try {
        // 關鍵：將文字轉成 bytes 格式
        const message = "Success_Check";
        const payload = ethers.hexlify(ethers.toUtf8Bytes(message));
        
        console.log(`📡 轉換後的 Payload: ${payload}`);

        const tx = await contract.sendMessage(payload);
        console.log(`✅ 交易已發送！Hash: ${tx.hash}`);
        
        await tx.wait();
        console.log("🎊 成功！你已在老師的 EIL 合約中觸發了 MessageSent 事件！");
    } catch (error) {
        console.error("❌ 失敗原因:", error.reason || error.message);
    }
}

main();