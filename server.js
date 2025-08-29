const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const youtubeDl = require('youtube-dl-exec');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// File upload configuration
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

// Routes
app.post('/api/upload', upload.single('video'), async (req, res) => {
    try {
        const videoPath = req.file.path;
        const clips = await processVideoWithAI(videoPath);
        res.json({ success: true, clips });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/youtube', async (req, res) => {
    try {
        const { url } = req.body;
        const videoInfo = await youtubeDl(url, { dumpSingleJson: true });
        const clips = await processYouTubeVideo(url);
        res.json({ success: true, videoInfo, clips });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function processVideoWithAI(videoPath) {
    // AI processing logic here
    // This would integrate with actual AI services
    return [
        {
            id: 1,
            title: "AI Generated Clip 1",
            startTime: 15,
            endTime: 45,
            confidence: 0.92
        }
    ];
}

app.listen(PORT, () => {
    console.log(`Clip AI server running on port ${PORT}`);
});
