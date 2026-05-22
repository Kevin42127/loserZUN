# 人生肥宅x尊 | ZUN 個人網站

這是一個為 YouTuber loserzun 製作的個人品牌網站，採用現代化設計和 YouTube API 整合。

## 功能特色

- 🎨 **現代化設計** - 深色主題、極簡主義風格
- 📱 **響應式布局** - 完美適配手機、平板、桌面
- 🎬 **YouTube API 整合** - 自動獲取最新影片
- 🗂️ **影片分類** - 自動分類為實驗性驗證、理性 Vlogs、高端開箱等
- 🎯 **互動體驗** - 影片彈窗播放、平滑滾動、載入動畫
- 🔗 **社群連結** - 整合 YouTube、Instagram、Facebook

## 設置說明

### 1. YouTube API 設置

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用 YouTube Data API v3
4. 建立認證金鑰 (API Key)
5. 將 API Key 替換到 `index.html` 中的 `YOUR_YOUTUBE_API_KEY`

```javascript
const YOUTUBE_API_KEY = '你的實際_API_Key';
```

### 2. 頻道 ID 設置

網站已設定為支援多個頻道，包括主頻道和第二頻道：

```javascript
const CHANNEL_IDS = [
    'UC6VKHP606ee6ffKwKmBHSig', // loserzun 主頻道
    'UC-ujeda5rDgCe-910J5keTg' // nerdzun 第二頻道
];
```

### 3. 本地運行

由於使用了 YouTube API，建議使用本地伺服器運行：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 或使用 Live Server 擴充功能 (VS Code)
```

然後訪問 `http://localhost:8000`

## 檔案結構

```
d:/loserZUN/
├── index.html          # 主要網站檔案
├── README.md          # 說明文件
└── assets/            # 靜態資源 (如需要)
```

## 主要功能

### 影片區塊

- **多頻道支援** - 同時顯示主頻道和第二頻道的影片
- **自動獲取** - 從 YouTube API 自動獲取最新影片
- **智能分類** - 根據標題和描述自動分類影片（包括 PVC 公仔開箱）
- **時間排序** - 按發布日期自動排序所有影片
- **頻道識別** - 顯示影片來自哪個頻道
- **篩選功能** - 可按類別篩選影片
- **直達連結** - 點擊影片直接跳轉到 YouTube 觀看

### 設計特色

- **ZUN 紅色主題** - 使用 #e60012 作為主要強調色
- **極簡主義** - 乾淨的布局和充足的留白
- **微互動** - 懸停效果、載入動畫、平滑過渡
- **字體層次** - 使用 Inter、Newsreader 和 JetBrains Mono

## 自訂設定

### 修改顏色主題

在 `<style>` 標籤中修改：

```css
.zun-red { color: #e60012; } /* 主要強調色 */
.bg-zun-red { background-color: #e60012; }
```

### 修改影片分類

在 `categorizeVideo` 函數中調整分類邏輯：

```javascript
function categorizeVideo(title, description) {
    const text = (title + ' ' + description).toLowerCase();
    
    if (text.includes('關鍵字')) {
        return '自訂類別';
    }
    // ... 更多分類邏輯
}
```

### 修改社群連結

在頁尾更新連結：

```html
<a href="你的連結" target="_blank">平台名稱</a>
```

## 效能優化

- 使用 CDN 加載 Tailwind CSS 和 Google Fonts
- 圖片懒載入和壓縮
- 最小化 JavaScript 執行
- 響應式圖片尺寸

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 授權

此專版為個人使用，請勿用於商業目的。

## 聯絡方式

如有問題或建議，請透過以下方式聯絡：
- 主頻道: https://www.youtube.com/@loserzun
- 第二頻道: https://www.youtube.com/@nerdzun
- Instagram: https://www.instagram.com/loserzun/?hl=zh-tw
- Facebook: https://www.facebook.com/loserZUN
- Email: just8080666@gmail.com
