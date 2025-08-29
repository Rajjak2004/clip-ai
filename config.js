// Clip AI Configuration
const CONFIG = {
    APP_NAME: 'Clip AI',
    VERSION: '1.0.0',
    MAX_FILE_SIZE: 500 * 1024 * 1024, // 500MB
    SUPPORTED_FORMATS: ['mp4', 'mov', 'avi', 'mkv'],
    DEFAULT_CLIP_DURATION: 30,
    MAX_CLIPS_PER_VIDEO: 10,
    
    // AI Settings
    AI_CONFIDENCE_THRESHOLD: 0.7,
    FACE_DETECTION_ENABLED: true,
    AUTO_CAPTIONS: true,
    
    // Social Media Presets
    PLATFORMS: {
        TIKTOK: { width: 1080, height: 1920, maxDuration: 60 },
        INSTAGRAM: { width: 1080, height: 1920, maxDuration: 90 },
        YOUTUBE_SHORTS: { width: 1080, height: 1920, maxDuration: 60 },
        LINKEDIN: { width: 1200, height: 1200, maxDuration: 300 }
    }
};
