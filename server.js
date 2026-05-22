const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// YouTube API 配置
const YOUTUBE_API_KEY = 'AIzaSyAzT49Wae0ZuVfLc0XXoOsAaZ9coG8mx28';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// 中間件
app.use(cors());
app.use(express.json());

// YouTube 頻道 ID
const CHANNEL_IDS = ['UC6VKHP606ee6ffKwKmBHSig', 'UC-ujeda5rDgCe-910J5keTg'];

// 影片分類函數
function categorizeVideo(title, description) {
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    
    if (titleLower.includes('都市傳說') || titleLower.includes('靈異') || titleLower.includes('鬼')) {
        return '都市傳說';
    } else if (titleLower.includes('實驗') || titleLower.includes('挑戰') || titleLower.includes('測試')) {
        return '實驗挑戰';
    } else if (titleLower.includes('開箱') || titleLower.includes('pvc') || titleLower.includes('公仔')) {
        return 'PVC公仔開箱';
    } else if (titleLower.includes('vlog') || titleLower.includes('日常') || titleLower.includes('生活')) {
        return '日常Vlog';
    } else {
        return '其他';
    }
}

// API 路由：獲取影片
app.get('/api/youtube/videos', async (req, res) => {
    try {
        const { maxResults = 6 } = req.query;
        let allVideos = [];
        
        // 為每個頻道獲取影片
        for (const channelId of CHANNEL_IDS) {
            const url = `${YOUTUBE_API_BASE}/search?part=snippet&type=video&channelId=${channelId}&maxResults=${Math.ceil(maxResults/2)}&order=date&key=${YOUTUBE_API_KEY}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(`YouTube API Error: ${data.error.message}`);
            }
            
            const videos = data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishedAt,
                category: categorizeVideo(item.snippet.title, item.snippet.description),
                channel: channelId === 'UC6VKHP606ee6ffKwKmBHSig' ? 'loserzun' : 'nerdzun'
            }));
            
            allVideos.push(...videos);
        }
        
        // 按發布日期排序
        allVideos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        
        // 限制結果數量
        const limitedVideos = allVideos.slice(0, parseInt(maxResults));
        
        res.json({
            success: true,
            videos: limitedVideos,
            total: limitedVideos.length
        });
        
    } catch (error) {
        console.error('獲取影片失敗:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: '無法載入影片，請稍後再試'
        });
    }
});

// 健康檢查
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 啟動服務器
app.listen(PORT, () => {
    console.log(`YouTube API 代理服務器運行在 http://localhost:${PORT}`);
});

module.exports = app;
