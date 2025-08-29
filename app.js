class ClipAI {
    constructor() {
        this.currentVideo = null;
        this.processing = false;
        this.clips = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadConfig();
    }
    
    setupEventListeners() {
        // File upload
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e);
        });
        
        // YouTube URL processing
        document.getElementById('youtubeUrl').addEventListener('paste', (e) => {
            setTimeout(() => this.validateYouTubeURL(e.target.value), 100);
        });
    }
    
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!this.validateFile(file)) return;
        
        this.currentVideo = {
            type: 'file',
            data: file,
            name: file.name,
            size: file.size,
            duration: await this.getVideoDuration(file)
        };
        
        this.updateUI('fileUploaded', file.name);
    }
    
    validateFile(file) {
        if (file.size > CONFIG.MAX_FILE_SIZE) {
            this.showNotification('File too large. Maximum size: 500MB', 'error');
            return false;
        }
        
        const extension = file.name.split('.').pop().toLowerCase();
        if (!CONFIG.SUPPORTED_FORMATS.includes(extension)) {
            this.showNotification('Unsupported format. Use: MP4, MOV, AVI, MKV', 'error');
            return false;
        }
        
        return true;
    }
    
    async getVideoDuration(file) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                resolve(video.duration);
                URL.revokeObjectURL(video.src);
            };
            video.src = URL.createObjectURL(file);
        });
    }
    
    async processWithAI() {
        if (this.processing) return;
        
        this.processing = true;
        this.updateUI('processing');
        
        try {
            // Simulate AI processing stages
            await this.analyzeAudio();
            await this.detectKeyMoments();
            await this.generateClips();
            await this.optimizeClips();
            
            this.updateUI('completed');
            this.showNotification('🎉 AI processing completed!', 'success');
        } catch (error) {
            this.showNotification('Error processing video', 'error');
            console.error(error);
        } finally {
            this.processing = false;
        }
    }
    
    async analyzeAudio() {
        // Simulate audio transcription and analysis
        return new Promise(resolve => {
            setTimeout(() => {
                this.updateProgress('Analyzing audio...', 20);
                resolve();
            }, 1000);
        });
    }
    
    async detectKeyMoments() {
        // AI moment detection simulation
        return new Promise(resolve => {
            setTimeout(() => {
                this.updateProgress('Detecting key moments...', 50);
                resolve();
            }, 1500);
        });
    }
    
    async generateClips() {
        // Generate clips based on AI analysis
        return new Promise(resolve => {
            setTimeout(() => {
                this.updateProgress('Creating clips...', 80);
                this.clips = this.createClipsData();
                resolve();
            }, 2000);
        });
    }
    
    async optimizeClips() {
        // Final optimization
        return new Promise(resolve => {
            setTimeout(() => {
                this.updateProgress('Finalizing...', 100);
                resolve();
            }, 500);
        });
    }
    
    createClipsData() {
        return [
            {
                id: 1,
                title: "🔥 Most Viral Moment",
                description: "High-energy segment with peak engagement potential",
                startTime: "2:15",
                duration: "25s",
                engagement: "94%",
                platforms: ["TikTok", "Instagram", "YouTube Shorts"],
                captions: true,
                faceDetection: true
            },
            {
                id: 2,
                title: "💡 Key Insight",
                description: "Core message that drives the main point home",
                startTime: "5:42",
                duration: "32s",
                engagement: "87%",
                platforms: ["LinkedIn", "Twitter"],
                captions: true,
                faceDetection: false
            },
            {
                id: 3,
                title: "😊 Emotional Hook",
                description: "Emotionally compelling moment perfect for shares",
                startTime: "8:30",
                duration: "18s",
                engagement: "91%",
                platforms: ["Instagram", "Facebook"],
                captions: true,
                faceDetection: true
            }
        ];
    }
    
    updateProgress(message, percent) {
        document.getElementById('progressText').textContent = `${message} ${percent}%`;
    }
    
    updateUI(state, data = null) {
        const loadingDiv = document.getElementById('loadingDiv');
        const resultsDiv = document.getElementById('resultsDiv');
        const uploadArea = document.querySelector('.upload-area h3');
        
        switch(state) {
            case 'fileUploaded':
                uploadArea.textContent = `✅ ${data}`;
                this.showNotification(`Video "${data}" uploaded successfully!`);
                break;
                
            case 'processing':
                loadingDiv.style.display = 'block';
                resultsDiv.style.display = 'none';
                break;
                
            case 'completed':
                loadingDiv.style.display = 'none';
                this.displayResults();
                break;
        }
    }
    
    displayResults() {
        const clipGrid = document.getElementById('clipGrid');
        clipGrid.innerHTML = '';
        
        this.clips.forEach(clip => {
            const clipElement = this.createClipElement(clip);
            clipGrid.appendChild(clipElement);
        });
        
        document.getElementById('resultsDiv').style.display = 'block';
    }
    
    createClipElement(clip) {
        const div = document.createElement('div');
        div.className = 'clip-card';
        div.innerHTML = `
            <div class="clip-thumbnail">
                <i class="fas fa-play"></i>
                <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem;">
                    ${clip.duration}
                </div>
            </div>
            <div class="clip-info">
                <div class="clip-title">${clip.title}</div>
                <div class="clip-description">${clip.description}</div>
                <div style="margin: 1rem 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: #666;">
                        <span><i class="fas fa-clock"></i> ${clip.startTime}</span>
                        <span><i class="fas fa-chart-line"></i> ${clip.engagement}</span>
                    </div>
                    <div style="font-size: 0.8rem; color: #888;">
                        Optimized for: ${clip.platforms.join(', ')}
                    </div>
                </div>
                <div class="clip-actions">
                    <button class="action-btn download-btn" onclick="clipAI.downloadClip(${clip.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="action-btn edit-btn" onclick="clipAI.editClip(${clip.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `;
        return div;
    }
    
    async downloadClip(clipId) {
        const clip = this.clips.find(c => c.id === clipId);
        this.showNotification(`📥 Downloading "${clip.title}"...`);
        
        // Simulate download process
        setTimeout(() => {
            this.showNotification(`✅ "${clip.title}" downloaded successfully!`);
        }, 2000);
    }
    
    editClip(clipId) {
        const clip = this.clips.find(c => c.id === clipId);
        this.showNotification(`🎬 Opening editor for "${clip.title}"...`);
        
        // In real implementation, open video editor
        setTimeout(() => {
            this.showNotification('Editor feature coming soon!');
        }, 1000);
    }
    
    showNotification(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize Clip AI
let clipAI;
document.addEventListener('DOMContentLoaded', () => {
    clipAI = new ClipAI();
});
