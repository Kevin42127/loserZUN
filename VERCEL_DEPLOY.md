# Vercel 部署指南

## 🚀 Vercel 部署步驟

### 1. 準備 GitHub 倉庫
```bash
# 初始化 Git (如果還沒有)
git init
git add .
git commit -m "Initial commit: YouTube API proxy with frontend"

# 推送到 GitHub
git remote add origin https://github.com/yourusername/loserzun.git
git push -u origin main
```

### 2. 部署到 Vercel

#### 方法一：通過 Vercel 網站
1. 訪問 [vercel.com](https://vercel.com)
2. 使用 GitHub 登入
3. 點擊 "New Project"
4. 選擇你的 GitHub 倉庫
5. Vercel 會自動檢測配置並部署

#### 方法二：使用 Vercel CLI
```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 部署
vercel

# 首次部署後，設置別名
vercel --prod
```

### 3. 環境變量設置

在 Vercel 控制台中設置環境變量：
1. 進入項目設置
2. 點擊 "Environment Variables"
3. 添加以下變量：

```
YOUTUBE_API_KEY = AIzaSyAzT49Wae0ZuVfLc0XXoOsAaZ9coG8mx28
```

### 4. 修改 server.js 使用環境變量

更新 `server.js` 中的 API Key 配置：

```javascript
// 將這行：
const YOUTUBE_API_KEY = 'AIzaSyAzT49Wae0ZuVfLc0XXoOsAaZ9coG8mx28';

// 改為：
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyAzT49Wae0ZuVfLc0XXoOsAaZ9coG8mx28';
```

## 🔧 Vercel 配置說明

### vercel.json 配置
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 路由說明
- **`/api/*`** → 路由到後端 API 函數
- **`/*`** → 路由到前端靜態文件

## 🌐 部署後的 URL

### API 端點
- **開發環境**: `http://localhost:3000/api/youtube/videos`
- **生產環境**: `https://your-project.vercel.app/api/youtube/videos`

### 前端網站
- **開發環境**: `file:///path/to/index.html`
- **生產環境**: `https://your-project.vercel.app`

## 📊 Vercel 優勢

### 🆓 免費功能
- **無限靜態託管**
- **Serverless 函數**: 每月 100,000 次調用
- **自定義域名**: 支持自定義域名
- **HTTPS**: 自動 SSL 證書
- **CDN**: 全球 CDN 分發

### ⚡ 性能優勢
- **全球 CDN**: 自動分發到最近節點
- **自動縮放**: 按需擴展
- **零冷啟動**: 快速響應
- **邊緣計算**: 就近處理請求

### 🛡️ 安全性
- **API Key 保護**: 環境變量存儲
- **HTTPS 強制**: 自動安全連接
- **防火牆保護**: DDoS 防護

## 🔍 故障排除

### 部署失敗
```bash
# 檢查 Vercel 日誌
vercel logs

# 本地測試
vercel dev
```

### API 無法訪問
1. 檢查環境變量是否設置
2. 查看函數日誌
3. 測試 API 端點：`https://your-project.vercel.app/api/youtube/videos`

### 前端無法載入
1. 檢查控制台錯誤
2. 確認 API URL 正確
3. 檢查 CORS 設置

## 📈 監控和分析

Vercel 提供：
- **訪問統計**: 流量分析
- **性能監控**: 響應時間
- **錯誤追蹤**: 錯誤日誌
- **使用統計**: API 調用次數

## 🎯 最佳實踐

1. **定期更新**: 保持依賴最新
2. **監控使用**: 注意 API 配額
3. **備份部署**: 使用多個環境
4. **性能優化**: 壓縮圖片和資源
