# YouTube API 後端代理設置指南

## 🛠️ 安裝步驟

### 1. 安裝 Node.js 依賴
```bash
npm install
```

### 2. 啟動後端服務器
```bash
npm start
```
或使用開發模式（自動重啟）：
```bash
npm run dev
```

### 3. 開啟前端網站
在瀏覽器中打開 `index.html`

## 🔧 工作原理

### 後端代理服務器
- **端口**: 3000
- **API 端點**: `http://localhost:3000/api/youtube/videos`
- **功能**: 隱藏 YouTube API Key，處理影片數據

### 前端調用
- **移除**: 暴露的 YouTube API Key
- **使用**: 後端 API 端點
- **安全**: API Key 完全隱藏在後端

## 📡 API 端點

### GET /api/youtube/videos
**參數**:
- `maxResults` (可選): 最大影片數量，預設 6

**回應**:
```json
{
  "success": true,
  "videos": [...],
  "total": 6
}
```

### GET /health
**功能**: 服務器健康檢查

## 🔒 安全優勢

1. **API Key 隱藏**: 完全不暴露在前端
2. **配額控制**: 後端統一管理 API 使用
3. **錯誤處理**: 統一的錯誤處理機制
4. **CORS 解決**: 自動處理跨域問題

## 🚀 部署建議

### 開發環境
```bash
npm run dev
```

### 生產環境
```bash
npm start
```

### 雲平台部署
- **Vercel**: 支持無服務器函數
- **Heroku**: 支持 Node.js 應用
- **AWS**: 使用 Lambda + API Gateway

## 📝 注意事項

1. **端口衝突**: 確保 3000 端口未被佔用
2. **網路連接**: 需要連接到 YouTube API
3. **API 配額**: 注意 YouTube API 的使用限制
4. **錯誤監控**: 查看控制台日誌

## 🐛 故障排除

### 後端無法啟動
```bash
# 檢查端口
netstat -an | findstr :3000

# 殺死進程
taskkill /PID <PID> /F
```

### 前端無法連接
- 確保後端服務器正在運行
- 檢查 `http://localhost:3000/health` 是否可訪問
- 查看瀏覽器控制台錯誤訊息

### 影片無法載入
- 檢查 YouTube API Key 是否有效
- 查看後端控制台日誌
- 確認網路連接正常
