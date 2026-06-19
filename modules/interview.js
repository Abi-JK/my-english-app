// AuraEnglish MNC Interview Prep Module
import { Storage } from './storage.js';

const interviewQuestions = [
    "Tell me about yourself. Walk me through your educational background and career goals.",
    "Why are you interested in joining our company, and what unique value do you bring to this role?",
    "Describe a time you faced a major technical challenge or project bottleneck. How did you resolve it?",
    "How do you handle disagreement or conflict within a team environment? Give a specific example."
];

const starPrompts = [
    "Describe a time you successfully managed a project under a tight deadline.",
    "Explain a situation where you had to learn a new programming language or tool quickly.",
    "Share an example of when you took initiative to solve a problem without being asked.",
    "Describe a time you had to deliver difficult feedback to a peer or teammate."
];

export const Interview = {
    state: {
        activeTab: 'landing', // 'landing', 'star', 'mock'
        starPromptIdx: 0,
        mockQuestionIdx: 0,
        mockResponses: [],
        isRecording: false,
        recognition: null,
        transcript: '',
        timer: 0,
        timerInterval: null
    },

    render(containerId, navigateTo) {
        const container = document.getElementById(containerId);

        if (this.state.activeTab === 'landing') {
            this.renderLanding(container);
        } else if (this.state.activeTab === 'star') {
            this.renderStarBuilder(container);
        } else if (this.state.activeTab === 'mock') {
            this.renderMockSimulator(container);
        }

        lucide.createIcons();
    },

    renderLanding(container) {
        container.innerHTML = `
            <div class="view-title-container">
                <h1 class="view-title">MNC Company Communication & HR Prep</h1>
                <p class="view-subtitle">Master the art of answering situational, behavioral, and technical background questions.</p>
            </div>
            
            <div class="exams-layout">
                <div class="glass-card feature-selector-card" id="select-star-btn">
                    <div class="feature-icon-box">
                        <i data-lucide="layout-grid" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>STAR Method Builder</h3>
                    <p>Format your behavioral stories using the professional standard: Situation, Task, Action, and Result. Draft, store, and review your interview answers.</p>
                </div>

                <div class="glass-card feature-selector-card" id="select-mock-btn">
                    <div class="feature-icon-box">
                        <i data-lucide="headset" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>Mock HR Interview Simulator</h3>
                    <p>Confront standard recruiter questions. Respond by speaking into the microphone or typing your answer. Get details about filler words and fluency.</p>
                </div>
            </div>
        `;

        document.getElementById('select-star-btn').addEventListener('click', () => {
            this.state.activeTab = 'star';
            this.state.starPromptIdx = 0;
            this.render('view-content');
        });

        document.getElementById('select-mock-btn').addEventListener('click', () => {
            this.state.activeTab = 'mock';
            this.state.mockQuestionIdx = 0;
            this.state.mockResponses = [];
            this.state.isRecording = false;
            this.state.transcript = '';
            this.render('view-content');
        });
    },

    renderStarBuilder(container) {
        const state = Storage.getState();
        const prompt = starPrompts[this.state.starPromptIdx];

        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 class="view-title">STAR Method Builder</h1>
                    <p class="view-subtitle">Draft structures for behavioral questions.</p>
                </div>
                <button class="btn-secondary" id="star-back-btn">
                    <i data-lucide="arrow-left"></i> Back to HR Prep
                </button>
            </div>
            
            <div class="interview-container">
                <!-- Left panel: Instruction & Worksheet -->
                <div class="glass-card answer-panel" style="grid-column: span 2; width: 100%;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--accent-purple);">Worksheet Topic:</h3>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" id="prev-star-prompt"><i data-lucide="chevron-left"></i> Prev</button>
                            <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" id="next-star-prompt">Next <i data-lucide="chevron-right"></i></button>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.02); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 20px; font-weight: 600;">
                        "${prompt}"
                    </div>

                    <div class="star-grid">
                        <div class="star-input-group">
                            <label>S - Situation</label>
                            <textarea id="star-situation" placeholder="Describe the context, project background, or issue you were facing..."></textarea>
                        </div>
                        <div class="star-input-group">
                            <label>T - Task</label>
                            <textarea id="star-task" placeholder="What was your specific responsibility? What did you need to achieve?"></textarea>
                        </div>
                        <div class="star-input-group">
                            <label>A - Action</label>
                            <textarea id="star-action" placeholder="Detail the steps you took to address the problem. Focus on your actions..."></textarea>
                        </div>
                        <div class="star-input-group">
                            <label>R - Result</label>
                            <textarea id="star-result" placeholder="Explain the outcome, metrics, savings, feedback, or lesson learned..."></textarea>
                        </div>
                    </div>
                    
                    <button class="btn-primary" style="align-self: flex-end; margin-top: 16px;" id="save-star-btn">
                        <i data-lucide="save"></i> Save Worksheet
                    </button>
                </div>
                
                <!-- History panel -->
                <div class="glass-card side-card" style="grid-column: span 2; width: 100%; margin-top: 20px;">
                    <h3>Saved STAR Worksheets</h3>
                    <div class="badge-list" id="saved-stars-list">
                        ${this.generateSavedStarsHtml(state.starResponses)}
                    </div>
                </div>
            </div>
        `;

        this.bindStarEvents();
    },

    generateSavedStarsHtml(saved) {
        if (!saved || saved.length === 0) {
            return `<div class="text-muted" style="text-align: center; padding: 20px; font-style: italic;">No worksheets saved yet. Start drafting above!</div>`;
        }

        return saved.map((item, idx) => `
            <div class="badge-item" style="flex-direction: column; align-items: flex-start; gap: 12px; padding: 20px; background: rgba(255, 255, 255, 0.01);">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                    <strong style="color: var(--accent-teal); font-size: 0.9rem;">Topic: ${item.prompt.substring(0, 50)}...</strong>
                    <span class="text-muted" style="font-size: 0.75rem;">${new Date(item.date).toLocaleString()}</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-size: 0.85rem; width: 100%;">
                    <div><strong>Situation:</strong> <p class="text-secondary" style="margin-top: 4px;">${item.situation}</p></div>
                    <div><strong>Task:</strong> <p class="text-secondary" style="margin-top: 4px;">${item.task}</p></div>
                    <div><strong>Action:</strong> <p class="text-secondary" style="margin-top: 4px;">${item.action}</p></div>
                    <div><strong>Result:</strong> <p class="text-secondary" style="margin-top: 4px;">${item.result}</p></div>
                </div>
            </div>
        `).join('');
    },

    bindStarEvents() {
        document.getElementById('star-back-btn').addEventListener('click', () => {
            this.state.activeTab = 'landing';
            this.render('view-content');
        });

        document.getElementById('prev-star-prompt').addEventListener('click', () => {
            if (this.state.starPromptIdx > 0) {
                this.state.starPromptIdx--;
                this.render('view-content');
            }
        });

        document.getElementById('next-star-prompt').addEventListener('click', () => {
            if (this.state.starPromptIdx < starPrompts.length - 1) {
                this.state.starPromptIdx++;
                this.render('view-content');
            }
        });

        document.getElementById('save-star-btn').addEventListener('click', () => {
            const situation = document.getElementById('star-situation').value.trim();
            const task = document.getElementById('star-task').value.trim();
            const action = document.getElementById('star-action').value.trim();
            const result = document.getElementById('star-result').value.trim();

            if (!situation || !task || !action || !result) {
                this.showToast("Please fill out all STAR quadrants before saving.");
                return;
            }

            Storage.saveStarResponse({
                prompt: starPrompts[this.state.starPromptIdx],
                situation,
                task,
                action,
                result,
                date: Date.now()
            });

            const stateResults = Storage.addXp(40);
            this.showToast("+40 XP! Story outline structured.");
            if (stateResults.leveledUp) {
                this.showToast(`Level Up! You are now level ${stateResults.newLevel}!`);
            }

            this.render('view-content'); // Refresh view to list saved worksheet
        });
    },

    renderMockSimulator(container) {
        const question = interviewQuestions[this.state.mockQuestionIdx];

        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h1 class="view-title">Mock HR Interview Simulator</h1>
                    <p class="view-subtitle">Question ${this.state.mockQuestionIdx + 1} of ${interviewQuestions.length}</p>
                </div>
                <button class="btn-secondary" id="mock-back-btn">
                    <i data-lucide="arrow-left"></i> Exit Simulator
                </button>
            </div>
            
            <div class="interview-container">
                <!-- Left panel: Interviewer UI -->
                <div class="glass-card interviewer-panel">
                    <div class="avatar-screen">
                        <div class="avatar-glow"></div>
                        <i data-lucide="user-check" class="avatar-icon"></i>
                    </div>
                    
                    <div class="speaking-wave" id="interviewer-speech-wave">
                        <div class="wave-bar" style="height: 10px;"></div>
                        <div class="wave-bar" style="height: 15px;"></div>
                        <div class="wave-bar" style="height: 20px;"></div>
                        <div class="wave-bar" style="height: 12px;"></div>
                        <div class="wave-bar" style="height: 8px;"></div>
                    </div>
                    
                    <div class="interviewer-bubble" id="interview-question-box">
                        ${question}
                    </div>
                    
                    <button class="btn-secondary" style="margin-top: 16px; font-size: 0.8rem; padding: 8px 16px;" id="text-speech-btn">
                        <i data-lucide="volume-2"></i> Read Out Loud
                    </button>
                </div>
                
                <!-- Right panel: Response panel -->
                <div class="glass-card answer-panel">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="text-muted" style="font-size: 0.85rem; font-weight: 600;">Response Window</span>
                        <div class="timer-box" id="mock-timer">00:00</div>
                    </div>
                    
                    <div class="response-tabs">
                        <button class="tab-btn active" id="tab-voice-btn">Speak Answer</button>
                        <button class="tab-btn" id="tab-text-btn">Type Answer</button>
                    </div>
                    
                    <!-- Speak Answer interface -->
                    <div id="voice-response-area" class="voice-record-container">
                        <button class="record-btn" id="mic-record-btn">
                            <i data-lucide="mic" style="width: 28px; height: 28px;"></i>
                        </button>
                        <strong id="record-status-text">Click mic to start recording</strong>
                        <p class="text-muted" style="font-size: 0.75rem; margin-top: 6px;">Web Speech recognition is activated on click.</p>
                        
                        <div class="transcript-preview" id="voice-transcript-box">
                            No transcript recorded yet...
                        </div>
                    </div>
                    
                    <!-- Type Answer interface (Hidden by default) -->
                    <div id="text-response-area" style="display: none;">
                        <textarea id="typed-answer-box" style="width: 100%; height: 220px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; color: var(--text-primary); font-size: 0.95rem; resize: none;" placeholder="Type your detailed interview answer here..."></textarea>
                    </div>

                    <button class="btn-primary" style="justify-content: center; width: 100%; margin-top: 8px;" id="submit-answer-btn" disabled>
                        <span>Submit Response</span>
                        <i data-lucide="send"></i>
                    </button>
                </div>
            </div>
            
            <!-- Analysis report popup overlay (Hidden by default) -->
            <div id="analysis-overlay" class="glass-card analysis-report" style="display: none; max-width: 800px; margin: 30px auto 0 auto;">
                <h4><i data-lucide="bar-chart-2"></i> Fluency & Feedback Analysis</h4>
                <div class="metric-row">
                    <div class="metric-card">
                        <span class="metric-val" id="metric-wpm">0</span>
                        <span class="metric-lbl">Words Spoken</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-val" id="metric-fillers">0</span>
                        <span class="metric-lbl">Filler Words Tracked</span>
                    </div>
                    <div class="metric-card">
                        <span class="metric-val" id="metric-score">0%</span>
                        <span class="metric-lbl">Confidence Score</span>
                    </div>
                </div>
                <div style="margin-top: 20px; line-height: 1.5; font-size: 0.9rem;" id="analysis-text">
                    Loading AI evaluation feedback...
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
                    <button class="btn-primary" id="analysis-continue-btn">
                        <span>Continue Practice</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;

        this.bindMockEvents();
    },

    bindMockEvents() {
        document.getElementById('mock-back-btn').addEventListener('click', () => {
            this.stopMockTimer();
            this.state.activeTab = 'landing';
            this.render('view-content');
        });

        // TTS Read aloud question
        const playBtn = document.getElementById('text-speech-btn');
        playBtn.addEventListener('click', () => {
            const utterance = new SpeechSynthesisUtterance(interviewQuestions[this.state.mockQuestionIdx]);
            utterance.rate = 0.95;

            // Audio wave speech animation
            const wave = document.getElementById('interviewer-speech-wave');
            wave.classList.add('active');

            utterance.onend = () => {
                wave.classList.remove('active');
            };

            window.speechSynthesis.speak(utterance);
        });

        // Tabs
        const tabVoice = document.getElementById('tab-voice-btn');
        const tabText = document.getElementById('tab-text-btn');
        const voiceArea = document.getElementById('voice-response-area');
        const textArea = document.getElementById('text-response-area');
        const typedBox = document.getElementById('typed-answer-box');
        const submitBtn = document.getElementById('submit-answer-btn');

        tabVoice.addEventListener('click', () => {
            tabVoice.classList.add('active');
            tabText.classList.remove('active');
            voiceArea.style.display = 'flex';
            textArea.style.display = 'none';
            if (this.state.transcript.trim().length > 0) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', 'true');
            }
        });

        tabText.addEventListener('click', () => {
            tabText.classList.add('active');
            tabVoice.classList.remove('active');
            textArea.style.display = 'block';
            voiceArea.style.display = 'none';
            if (typedBox.value.trim().length > 0) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', 'true');
            }
        });

        // Text area event listener to toggle submit button
        typedBox.addEventListener('input', () => {
            if (typedBox.value.trim().length > 0) {
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.setAttribute('disabled', 'true');
            }
        });

        // Voice recorder Speech recognition initialization
        const recordBtn = document.getElementById('mic-record-btn');
        const statusText = document.getElementById('record-status-text');
        const transcriptBox = document.getElementById('voice-transcript-box');

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.state.recognition = new SpeechRecognition();
            this.state.recognition.continuous = true;
            this.state.recognition.interimResults = true;
            this.state.recognition.lang = 'en-US';

            this.state.recognition.onstart = () => {
                this.state.isRecording = true;
                recordBtn.classList.add('recording');
                statusText.innerText = "Recording... Speak clearly.";
                this.startMockTimer();
            };

            this.state.recognition.onresult = (e) => {
                let interimTranscript = '';
                for (let i = e.resultIndex; i < e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        this.state.transcript += e.results[i][0].transcript + ' ';
                    } else {
                        interimTranscript += e.results[i][0].transcript;
                    }
                }
                transcriptBox.innerHTML = `<strong>Final:</strong> ${this.state.transcript} <br><span style="opacity:0.7">Interim: ${interimTranscript}</span>`;

                if (this.state.transcript.trim().length > 0) {
                    submitBtn.removeAttribute('disabled');
                }
            };

            this.state.recognition.onerror = (e) => {
                console.warn('Speech recognition error:', e.error);
                statusText.innerText = "Error: Please check microphone permission.";
                this.state.isRecording = false;
                recordBtn.classList.remove('recording');
            };

            this.state.recognition.onend = () => {
                this.state.isRecording = false;
                recordBtn.classList.remove('recording');
                statusText.innerText = "Recording stopped. Ready to submit.";
                this.stopMockTimer();
            };
        } else {
            statusText.innerText = "Speech API not supported in this browser. Mock mic enabled.";
        }

        // Click record button trigger
        recordBtn.addEventListener('click', () => {
            if (this.state.isRecording) {
                if (this.state.recognition) this.state.recognition.stop();
                this.stopMockTimer();
                this.state.isRecording = false;
                recordBtn.classList.remove('recording');
                statusText.innerText = "Recording stopped. Ready to submit.";
            } else {
                this.state.transcript = '';
                transcriptBox.innerText = "Listening...";
                if (this.state.recognition) {
                    try {
                        this.state.recognition.start();
                    } catch (e) {
                        this.state.recognition.stop();
                    }
                } else {
                    // Fallback mock recording
                    this.state.isRecording = true;
                    recordBtn.classList.add('recording');
                    statusText.innerText = "Mock recording active... Type instead or speak.";
                    this.startMockTimer();
                    setTimeout(() => {
                        this.state.transcript = "I am a proactive team player. I led the deployment of the server migration project. I believe my communication skills make me a great fit, basically.";
                        transcriptBox.innerHTML = `<strong>Mock Transcript:</strong> ${this.state.transcript}`;
                        submitBtn.removeAttribute('disabled');
                        this.state.isRecording = false;
                        recordBtn.classList.remove('recording');
                        statusText.innerText = "Mock recording finished.";
                        this.stopMockTimer();
                    }, 5000);
                }
            }
        });

        // Submit Action & Performance scoring logic
        submitBtn.addEventListener('click', () => {
            if (this.state.recognition && this.state.isRecording) {
                this.state.recognition.stop();
            }

            const isVoice = tabVoice.classList.contains('active');
            const answer = isVoice ? this.state.transcript : typedBox.value;

            const analytics = this.analyzeSpeech(answer);

            // Render popup results
            document.getElementById('metric-wpm').innerText = analytics.words;
            document.getElementById('metric-fillers').innerText = analytics.fillerCount;
            document.getElementById('metric-score').innerText = `${analytics.score}%`;

            let feedback = '';
            if (analytics.score >= 80) {
                feedback = `<strong>Excellent performance!</strong> Your explanation was comprehensive and structured. You maintained a low count of filler words (${analytics.fillerCount}) which helps you sound extremely professional. Keep up this exact level of confidence during MNC communication loops!`;
            } else if (analytics.score >= 50) {
                feedback = `<strong>Good effort.</strong> You answered the core query, but we noted some areas for improvement. You used filler words like "like", "basically", or "um" ${analytics.fillerCount} times. Try to introduce pauses instead of vocal fillers to convey higher corporate authority.`;
            } else {
                feedback = `<strong>Needs Practice.</strong> Your response was relatively brief (${analytics.words} words). HR managers at MNCs look for detailed explanations showing past impacts. Try drafting stories in the <strong>STAR Method Builder</strong> first to build robust situational examples.`;
            }

            document.getElementById('analysis-text').innerHTML = feedback;

            // Award XP
            const awardXp = analytics.score >= 80 ? 60 : 40;
            const results = Storage.addXp(awardXp);
            this.showToast(`+${awardXp} XP! Feedback report generated.`);
            if (results.leveledUp) {
                this.showToast(`Level Up! You are now level ${results.newLevel}!`);
            }

            // Show overlay, hide answer box
            document.getElementById('analysis-overlay').style.display = 'block';
            submitBtn.setAttribute('disabled', 'true');
        });

        // Continue practice inside mock simulation
        document.getElementById('analysis-continue-btn').addEventListener('click', () => {
            document.getElementById('analysis-overlay').style.display = 'none';
            typedBox.value = '';
            this.state.transcript = '';
            document.getElementById('voice-transcript-box').innerText = 'No transcript recorded yet...';

            if (this.state.mockQuestionIdx < interviewQuestions.length - 1) {
                this.state.mockQuestionIdx++;
                this.render('view-content');
            } else {
                Storage.unlockAchievement('interviewer');
                this.showToast("Mock Interview Prep Round Completed! Badge Unlocked!");
                this.state.activeTab = 'landing';
                this.render('view-content');
            }
        });
    },

    analyzeSpeech(text) {
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;

        // Match standard interview filler words
        const fillerList = ['um', 'uh', 'like', 'basically', 'actually', 'so', 'you know', 'mean'];
        let fillerCount = 0;

        words.forEach(word => {
            const cleanWord = word.toLowerCase().replace(/[^a-zA-Z]/g, '');
            if (fillerList.includes(cleanWord)) {
                fillerCount++;
            }
        });

        // Score calculation:
        // Length score: up to 40 pts (ideal length is 60-150 words)
        // Filler penalty: starts at 40 pts, deduct 5 pts per filler word (floor at 0)
        // Complexity score: 20 pts based on word size
        let lengthScore = Math.min(40, (wordCount / 100) * 40);
        let fillerScore = Math.max(0, 40 - (fillerCount * 5));
        let complexityScore = Math.min(20, (text.replace(/[^a-zA-Z]/g, '').length / (wordCount || 1)) * 4);

        const score = Math.round(lengthScore + fillerScore + complexityScore);

        return {
            words: wordCount,
            fillerCount,
            score: Math.min(100, Math.max(20, score))
        };
    },

    startMockTimer() {
        this.stopMockTimer();
        this.state.timer = 0;
        const timerDiv = document.getElementById('mock-timer');

        this.state.timerInterval = setInterval(() => {
            this.state.timer++;
            const mins = Math.floor(this.state.timer / 60).toString().padStart(2, '0');
            const secs = (this.state.timer % 60).toString().padStart(2, '0');
            if (timerDiv) {
                timerDiv.innerText = `${mins}:${secs}`;
            }
        }, 1000);
    },

    stopMockTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    showToast(msg) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        if (toast && toastMessage) {
            toastMessage.innerText = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    }
};
