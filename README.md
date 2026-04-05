# BCCA-SDK

## 官方 SDK 的技術問題統整

### 核心問題：BigInt 型別不一致

SDK 內部用 `Map` 來儲存所有鏈的資訊，存入時會把 chainId 轉成 BigInt，但查詢時卻沒有轉換，導致永遠找不到資料。這個錯誤重複出現在 5 個檔案裡：
```js
存入：map.set(BigInt(chainId), 資料)   ✅
查詢：map.get(chainId)                 ❌ 找不到，因為型別不同
```

---

### 被這個問題影響的地方

**第一關** `NetworkEnvironment.js`
存 Paymaster 和 EntryPoint 地址時沒轉 BigInt，查詢時爆炸。

**第二關** `CrossChainBuilder.js`
`startBatch()` 傳入的 chainId 沒轉 BigInt，查詢 Paymaster 地址時爆炸。

**第三關** `MultichainContract.js`
`addressOn()`、`hasAddress()`、`addAddress()` 三個方法都沒有統一型別，互相矛盾。

**第四關** `MultichainClient.js`
`clientOn()` 查詢時沒轉 BigInt，找不到對應的鏈。

**第五關** `MultichainBundlerManager.js`
`sendUserOperation()` 查詢 Bundler 時沒轉 BigInt，找不到對應的 Bundler。

---

### 其他問題

**設定方式沒有文件說明**
SDK 的 `deployments` 欄位完全被忽略，地址要放在 `chainInfos[]` 裡面，但這件事完全沒有文件說明，要讀源碼才知道。

**EntryPoint 是自定義版本**
SDK 用的 EntryPoint `0x433709...` 不是標準的 ERC-4337 合約，所以所有公開的 Bundler 服務（Pimlico 等）都不支援，必須用他們自己的 Bundler。

**依賴私有基礎設施**
SDK 的 `deployment.json` 裡寫死的 RPC 是 Tenderly 私有節點，一般人根本連不進去，必須要有帳號和權限。

---

### 一句話總結

這個 SDK 是一個**還在開發中、依賴私有環境、缺乏文件、且有基本型別 bug 的實驗性專案**，不是一個可以直接拿來用的成熟產品。
