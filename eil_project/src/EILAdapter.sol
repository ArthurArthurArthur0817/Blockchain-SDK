// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract EILAdapter{
    // 當使用者發起意圖時，會拋出這個事件，供後端監聽
    event IntentLogged(bytes32 indexed intentId, address indexed user, string action);

    // 模擬使用者發起一個跨鏈意圖 (例如: "Bridge 0.01 ETH to OP")
    function requestIntent(string memory _action) public {
        // 產生一個唯一的意圖 ID
        bytes32 id = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        
        // 拋出事件，這就是你的 Relayer 會捕捉到的「訊號」
        emit IntentLogged(id, msg.sender, _action);
    }
}