const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // 測試連線是否正常
    const network = await provider.getNetwork();
    console.log(`✅ 已連線到鏈：${network.name} (ChainID: ${network.chainId})`);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    // 使用更精簡的格式
    const abi = [
        "event IntentLogged(bytes32 indexed intentId, address indexed user, string action)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, provider);

    console.log("🚀 監聽器準備就緒...");
    console.log(`📍 監聽地址: ${contractAddress}`);

    // 直接監聽所有日誌來偵錯
    provider.on("pending", (tx) => {
        // 這行會捕捉所有發送到區塊鏈的交易
    });

    contract.on("IntentLogged", (intentId, user, action) => {
        console.log("\n🔥 [偵測到事件] 🔥");
        console.log(`🆔 ID: ${intentId}`);
        console.log(`👤 用戶: ${user}`);
        console.log(`📝 動作: ${action}`);
        console.log("----------------------------");
    });
}

main().catch((error) => {
    console.error("❌ 發生錯誤:", error);
});