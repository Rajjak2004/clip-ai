// YouTube API Integration for Clip AI
class YouTubeProcessor {
    constructor() {
        this.apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with actual API key
        this.baseURL = 'https://www.googleapis.com/youtube/v3';
    }
    
    extractVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    
    async getVideoInfo(videoId) {
        try {
            const response = await fetch(
                `${this.baseURL}/videos?id=${videoId}&part=snippet,contentDetails&key=${this.apiKey}`
            );
            const data = await response.json();
            return data.items[0];
        } catch (error) {
            console.error('Error fetching video info:', error);
            return null;
        }
    }
    
    async downloadVideo(videoId) {
        // Note: YouTube video downloading requires backend implementation
        // This is a frontend simulation
        return {
            success: true,
            message: 'Video processed successfully',
            videoData: {
                id: videoId,
                processed: true
            }
        };
    }
    
    parseDuration(duration) {
        // Parse ISO 8601 duration format (PT1M30S = 1:30)
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = parseInt(match[1]) || 0;
        const minutes = parseInt(match[2]) || 0;
        const seconds = parseInt(match[3]) || 0;
        return hours * 3600 + minutes * 60 + seconds;
    }
}
