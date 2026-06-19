// AuraEnglish Role-Play & Speech Module
import { Storage } from './storage.js';

// Pre-scripted responsive roleplay dialogs
const roleplays = {
    meeting: {
        title: "Business Meeting (Negotiating a Deadline)",
        subtitle: "Align with your project director regarding an uncompleted database migration.",
        botName: "Sarah (Project Director)",
        script: [
            {
                trigger: 'start',
                text: "Thanks for meeting on such short notice. We are scheduled to launch the new client features on Friday. However, the database migrator hasn\'t passed all testing blocks yet. Should we proceed with the deployment?",
                replies: [
                    { keywords: ['yes', 'proceed', 'sure', 'can', 'agree', 'launch'], next: 'agree_launch', response: "I understand the urgency to deploy, but is it technically stable? An unexpected outage will breach our SLA. How will you mitigate this risk?" },
                    { keywords: ['no', 'delay', 'wait', 'cannot', 'test', 'more time'], next: 'postpone_launch', response: "I agree that stability is crucial. If we postpone, the stakeholders will request an official technical summary. How many additional days do you need for complete test coverage?" },
                    { default: true, next: 'general_ask', response: "I see your point. We need to balance speed and stability. If we push partial features first, what components are ready for production right now?" }
                ]
            },
            {
                trigger: 'agree_launch',
                text: "Okay, if we proceed, we need an immediate rollback script and clear client notification rules. Can you prepare this technical recovery checklist within 2 hours?",
                replies: [
                    { keywords: ['yes', 'can', 'will do', 'sure', 'done', 'prepare'], next: 'end_success', response: "Perfect! Get that checklist drafted and shared. That will give us a safety net. Great job responding under pressure." },
                    { default: true, next: 'end_neutral', response: "Understood. Let\'s coordinate with the DevOps lead immediately to avoid scheduling bottlenecks. Thanks for your support." }
                ]
            },
            {
                trigger: 'postpone_launch',
                text: "That sounds like a sensible timeline. I will draft a schedule update for the client management team. Can you send me a short email summary outlining the key testing milestones left?",
                replies: [
                    { keywords: ['yes', 'sure', 'will', 'send', 'write', 'email'], next: 'end_success', response: "Thank you. Having that clear technical justification will help keep the clients happy. Let\'s get back to work!" },
                    { default: true, next: 'end_neutral', response: "Understood. Keep me informed as tasks advance. Let\'s focus on quality first." }
                ]
            },
            {
                trigger: 'general_ask',
                text: "Partial launch is definitely an option. Let\'s sit down with the QA engineers and review which branches are safe. Do you have the dashboard analytics ready to present to them?",
                replies: [
                    { default: true, next: 'end_neutral', response: "Okay. Let\'s set up that technical alignment sync and finalize the launch strategy. Good communication!" }
                ]
            }
        ]
    },
    cafe: {
        title: "Ordering at a Cafe",
        subtitle: "Practice ordering beverages and handle standard modifications.",
        botName: "David (Barista)",
        script: [
            {
                trigger: 'start',
                text: "Welcome to Aura Cafe! What can I get started for you today?",
                replies: [
                    { keywords: ['coffee', 'cappuccino', 'latte', 'espresso', 'tea'], next: 'coffee_ordered', response: "Excellent choice. What size would you like: Small, Medium, or Large? And do you have any milk preference?" },
                    { default: true, next: 'general_cafe', response: "Sure, we have a selection of artisanal coffees, herbal teas, and fresh pastries. What appeals to you?" }
                ]
            },
            {
                trigger: 'coffee_ordered',
                text: "Got it. I\'ll get that started. Would you like to add any pastries, like a butter croissant or chocolate muffin, to your order today?",
                replies: [
                    { keywords: ['yes', 'croissant', 'muffin', 'pastry', 'add'], next: 'pastry_added', response: "Perfect, I\'ll heat that up for you. That will be $7.50. Will that be cash or card?" },
                    { default: true, next: 'no_pastry', response: "No problem. Just the beverage then. That will be $4.20. Cash or card?" }
                ]
            },
            {
                trigger: 'pastry_added',
                text: "Here is your heated pastry and your drink. Have a wonderful day!",
                replies: [
                    { default: true, next: 'end_success', response: "Thank you for visiting Aura Cafe! Enjoy your day!" }
                ]
            },
            {
                trigger: 'no_pastry',
                text: "Here is your drink. Enjoy it!",
                replies: [
                    { default: true, next: 'end_success', response: "Thank you! Take care." }
                ]
            },
            {
                trigger: 'general_cafe',
                text: "Let me know when you are ready to order. No rush!",
                replies: [
                    { default: true, next: 'end_neutral', response: "Thanks for dropping by!" }
                ]
            }
        ]
    }
};

const pronunciationPrompts = [
    "The engineering lead successfully deployed the cloud infrastructure.",
    "A clear communication strategy is essential to clear MNC interview rounds.",
    "Practice grammar and vocabulary daily to prepare for competitive examinations.",
    "We need to schedule a synchronous alignment sync to review database rollbacks."
];

export const Conversation = {
    state: {
        activeTab: 'landing', // 'landing', 'roleplay', 'pronounce'
        activeScenarioKey: '',
        currentStepTrigger: 'start',
        chatLog: [], // { sender: 'assistant'/'user', text: '' }
        pronounceIdx: 0,
        recognition: null,
        isRecording: false,
        lastTranscript: '',
        speakingMode: false
    },

    render(containerId, navigateTo) {
        const container = document.getElementById(containerId);
        
        if (this.state.activeTab === 'landing') {
            this.renderLanding(container);
        } else if (this.state.activeTab === 'roleplay') {
            this.renderRoleplay(container);
        } else if (this.state.activeTab === 'pronounce') {
            this.renderPronunciation(container);
        }
        
        lucide.createIcons();
    },

    renderLanding(container) {
        container.innerHTML = `
            <div class="view-title-container">
                <h1 class="view-title">Role-Play & Speech Trainer</h1>
                <p class="view-subtitle">Practice conversational scenarios or read prompt guidelines aloud to grade your speech patterns.</p>
            </div>
            
            <div class="exams-layout">
                <div class="glass-card feature-selector-card" id="select-roleplay-btn">
                    <div class="feature-icon-box">
                        <i data-lucide="messages-square" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>Interactive Role-Play</h3>
                    <p>Select a real-world scenario (such as a Corporate Alignment Meeting or Cafe Ordering) and chat with an interactive agent using text or voice.</p>
                </div>

                <div class="glass-card feature-selector-card" id="select-pronounce-btn">
                    <div class="feature-icon-box">
                        <i data-lucide="mic-2" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>Pronunciation Grader</h3>
                    <p>Read advanced communication phrases into the microphone. Our system matches the speech response and computes an accuracy score.</p>
                </div>
            </div>
        `;
        
        document.getElementById('select-roleplay-btn').addEventListener('click', () => {
            this.state.activeTab = 'roleplay';
            this.state.activeScenarioKey = 'meeting'; // default
            this.state.currentStepTrigger = 'start';
            
            const scenario = roleplays[this.state.activeScenarioKey];
            this.state.chatLog = [
                { sender: 'assistant', text: scenario.script[0].text }
            ];
            this.state.isRecording = false;
            this.render('view-content');
        });
        
        document.getElementById('select-pronounce-btn').addEventListener('click', () => {
            this.state.activeTab = 'pronounce';
            this.state.pronounceIdx = 0;
            this.state.isRecording = false;
            this.state.lastTranscript = '';
            this.render('view-content');
        });
    },

    renderRoleplay(container) {
        const scenario = roleplays[this.state.activeScenarioKey];
        
        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h1 class="view-title">Role-Play: ${scenario.title}</h1>
                    <p class="view-subtitle">${scenario.subtitle}</p>
                </div>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <select id="roleplay-scenario-select" class="btn-secondary" style="background-color: var(--bg-card); color: var(--text-primary); border-color: var(--border-color); padding: 8px 16px;">
                        <option value="meeting" ${this.state.activeScenarioKey === 'meeting' ? 'selected' : ''}>Business Meeting</option>
                        <option value="cafe" ${this.state.activeScenarioKey === 'cafe' ? 'selected' : ''}>Ordering at Cafe</option>
                    </select>
                    <button class="btn-secondary" id="rp-back-btn">
                        <i data-lucide="arrow-left"></i> Exit Role-Play
                    </button>
                </div>
            </div>
            
            <div class="glass-card chat-container">
                <div class="chat-messages" id="chat-messages-box">
                    ${this.state.chatLog.map(msg => `
                        <div class="chat-bubble ${msg.sender}">
                            ${msg.sender === 'assistant' ? `<strong>${scenario.botName}</strong><br>` : ''}
                            ${msg.text}
                        </div>
                    `).join('')}
                </div>
                
                <div class="chat-input-area">
                    <div class="chat-input-wrapper">
                        <input type="text" id="chat-text-input" placeholder="Type your response here..." ${this.state.currentStepTrigger.startsWith('end') ? 'disabled' : ''}>
                        <button class="mic-input-btn" id="chat-mic-btn" title="Use Speech-to-Text" ${this.state.currentStepTrigger.startsWith('end') ? 'disabled' : ''}>
                            <i data-lucide="mic"></i>
                        </button>
                    </div>
                    <button class="btn-primary" id="chat-send-btn" ${this.state.currentStepTrigger.startsWith('end') ? 'disabled' : ''}>
                        <span>Send</span>
                        <i data-lucide="send"></i>
                    </button>
                </div>
            </div>
        `;
        
        this.scrollChat();
        this.bindRoleplayEvents(scenario);
    },

    scrollChat() {
        setTimeout(() => {
            const box = document.getElementById('chat-messages-box');
            if (box) box.scrollTop = box.scrollHeight;
        }, 10);
    },

    bindRoleplayEvents(scenario) {
        document.getElementById('rp-back-btn').addEventListener('click', () => {
            this.state.activeTab = 'landing';
            this.render('view-content');
        });

        // Scenario switcher
        const switcher = document.getElementById('roleplay-scenario-select');
        switcher.addEventListener('change', (e) => {
            this.state.activeScenarioKey = e.target.value;
            this.state.currentStepTrigger = 'start';
            const newScenario = roleplays[this.state.activeScenarioKey];
            this.state.chatLog = [
                { sender: 'assistant', text: newScenario.script[0].text }
            ];
            this.render('view-content');
        });

        const input = document.getElementById('chat-text-input');
        const sendBtn = document.getElementById('chat-send-btn');
        const micBtn = document.getElementById('chat-mic-btn');

        // Speech-to-text integration for input field
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.state.recognition = new SpeechRecognition();
            this.state.recognition.continuous = false;
            this.state.recognition.interimResults = false;
            this.state.recognition.lang = 'en-US';

            this.state.recognition.onstart = () => {
                this.state.isRecording = true;
                micBtn.classList.add('active');
                input.placeholder = "Listening... Speak now.";
            };

            this.state.recognition.onresult = (e) => {
                const text = e.results[0][0].transcript;
                input.value = text;
            };

            this.state.recognition.onerror = () => {
                this.showToast("Speech Recognition Error. Check microphone permission.");
                this.state.isRecording = false;
                micBtn.classList.remove('active');
                input.placeholder = "Type your response here...";
            };

            this.state.recognition.onend = () => {
                this.state.isRecording = false;
                micBtn.classList.remove('active');
                input.placeholder = "Type your response here...";
            };

            micBtn.addEventListener('click', () => {
                if (this.state.isRecording) {
                    this.state.recognition.stop();
                } else {
                    this.state.recognition.start();
                }
            });
        } else {
            micBtn.addEventListener('click', () => {
                this.showToast("Web Speech API not supported in this browser.");
            });
        }

        const handleSend = () => {
            const val = input.value.trim();
            if (!val) return;
            
            // Add user message
            this.state.chatLog.push({ sender: 'user', text: val });
            input.value = '';
            
            // Process script transition
            const currentBlock = scenario.script.find(s => s.trigger === this.state.currentStepTrigger);
            let nextTrigger = 'general_ask';
            let replyText = '';
            
            if (currentBlock) {
                // Find matching keyword reply
                const matchedReply = currentBlock.replies.find(reply => {
                    if (reply.keywords) {
                        return reply.keywords.some(kw => val.toLowerCase().includes(kw));
                    }
                    return false;
                });
                
                const finalReply = matchedReply || currentBlock.replies.find(r => r.default);
                if (finalReply) {
                    nextTrigger = finalReply.next;
                    replyText = finalReply.response;
                }
            }
            
            this.state.currentStepTrigger = nextTrigger;
            
            // Render user response first
            this.render('view-content');
            
            // Add bot reply after a short delay
            setTimeout(() => {
                this.state.chatLog.push({ sender: 'assistant', text: replyText });
                
                if (nextTrigger.startsWith('end')) {
                    const bonus = nextTrigger === 'end_success' ? 50 : 20;
                    const results = Storage.addXp(bonus);
                    this.showToast(`+${bonus} XP! Scenario complete.`);
                    if (results.leveledUp) {
                        this.showToast(`Level Up! You are now level ${results.newLevel}!`);
                    }
                    
                    // Add system message
                    this.state.chatLog.push({ sender: 'assistant', text: `<strong>System:</strong> Conversational Role-play session complete! You did a great job exercising your English skills. Check your dashboard metrics!` });
                }
                
                this.render('view-content');
            }, 1000);
        };

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    },

    renderPronunciation(container) {
        const target = pronunciationPrompts[this.state.pronounceIdx];
        
        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h1 class="view-title">Speech Pronunciation Grader</h1>
                    <p class="view-subtitle">Read the paragraph aloud. Accuracy matched by Google Web Speech APIs.</p>
                </div>
                <button class="btn-secondary" id="pron-back-btn">
                    <i data-lucide="arrow-left"></i> Exit Grader
                </button>
            </div>
            
            <div class="vocab-center-container" style="max-width: 700px;">
                <div class="glass-card" style="width: 100%; padding: 32px; margin-bottom: 24px; text-align: center;">
                    <span class="word-pos" style="background: rgba(6, 182, 212, 0.15); color: var(--accent-teal);">Target Prompt:</span>
                    <h3 style="font-size: 1.35rem; font-weight: 700; line-height: 1.6; margin-top: 12px;" id="target-prompt-box">${target}</h3>
                </div>
                
                <div class="glass-card voice-record-container" style="width: 100%; margin-bottom: 24px;">
                    <button class="record-btn" id="pronounce-record-btn" style="background: var(--accent-purple); box-shadow: 0 0 20px var(--accent-purple-glow);">
                        <i data-lucide="mic" style="width: 28px; height: 28px;"></i>
                    </button>
                    <strong id="pron-status-text">Click mic and read the prompt clearly</strong>
                    
                    <div class="transcript-preview" id="pronounce-transcript-box" style="margin-top: 20px; width: 100%; min-height: 80px;">
                        ${this.state.lastTranscript ? `<strong>You Spoke:</strong> "${this.state.lastTranscript}"` : 'Listening transcript will display here...'}
                    </div>
                </div>

                <div id="pron-score-card" class="glass-card" style="display: none; width: 100%; padding: 24px; background: rgba(16, 185, 129, 0.05); border-color: var(--success-glow); margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span class="stat-label">Pronunciation Score</span>
                            <h2 style="font-size: 2.2rem; font-weight: 800; color: var(--success);" id="pron-accuracy-val">0%</h2>
                        </div>
                        <div id="pron-grade-message" style="max-width: 60%; font-size: 0.9rem; line-height: 1.5;">
                            Excellent matches!
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 16px; width: 100%;">
                    <button class="btn-secondary" style="flex: 1; justify-content: center;" id="pron-retry-btn" style="display: none;">
                        <i data-lucide="rotate-ccw"></i> Retry Prompt
                    </button>
                    <button class="btn-primary" style="flex: 1; justify-content: center;" id="pron-next-btn">
                        <span>${this.state.pronounceIdx === pronunciationPrompts.length - 1 ? 'Finish Practice' : 'Next Prompt'}</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        this.bindPronunciationEvents();
    },

    bindPronunciationEvents() {
        document.getElementById('pron-back-btn').addEventListener('click', () => {
            this.state.activeTab = 'landing';
            this.render('view-content');
        });

        const recordBtn = document.getElementById('pronounce-record-btn');
        const statusText = document.getElementById('pron-status-text');
        const transcriptBox = document.getElementById('pronounce-transcript-box');
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        recordBtn.addEventListener('click', () => {
            if (this.state.isRecording) {
                if (this.state.recognition) {
                    this.state.recognition.stop();
                }
                this.state.isRecording = false;
                recordBtn.classList.remove('recording');
            } else {
                this.state.lastTranscript = '';
                transcriptBox.innerText = 'Listening... Speak now.';
                
                if (SpeechRecognition) {
                    this.state.recognition = new SpeechRecognition();
                    this.state.recognition.continuous = false;
                    this.state.recognition.interimResults = false;
                    this.state.recognition.lang = 'en-US';
                    
                    this.state.recognition.onstart = () => {
                        this.state.isRecording = true;
                        recordBtn.classList.add('recording');
                        statusText.innerText = 'Recording speech. Speak now.';
                    };
                    
                    this.state.recognition.onresult = (e) => {
                        const transcript = e.results[0][0].transcript;
                        this.state.lastTranscript = transcript;
                        transcriptBox.innerHTML = `<strong>You Spoke:</strong> "${transcript}"`;
                        
                        this.gradePronunciation(transcript);
                    };
                    
                    this.state.recognition.onerror = () => {
                        statusText.innerText = "Mic error. Please retry.";
                        this.state.isRecording = false;
                        recordBtn.classList.remove('recording');
                    };
                    
                    this.state.recognition.onend = () => {
                        this.state.isRecording = false;
                        recordBtn.classList.remove('recording');
                        statusText.innerText = "Ready. Tap mic to record again.";
                    };
                    
                    this.state.recognition.start();
                } else {
                    // Fallback mock pronunciation grading
                    this.state.isRecording = true;
                    recordBtn.classList.add('recording');
                    statusText.innerText = "Mock recording active... speak.";
                    
                    setTimeout(() => {
                        this.state.isRecording = false;
                        recordBtn.classList.remove('recording');
                        
                        // Pick a mock transcription resembling the prompt (90% match)
                        const prompt = pronunciationPrompts[this.state.pronounceIdx];
                        this.state.lastTranscript = prompt.replace("infrastructure", "infra-structure").replace("successful", "success-fully");
                        transcriptBox.innerHTML = `<strong>Mock Spoke:</strong> "${this.state.lastTranscript}"`;
                        this.gradePronunciation(this.state.lastTranscript);
                    }, 4000);
                }
            }
        });

        document.getElementById('pron-next-btn').addEventListener('click', () => {
            if (this.state.pronounceIdx < pronunciationPrompts.length - 1) {
                this.state.pronounceIdx++;
                this.state.lastTranscript = '';
                this.render('view-content');
            } else {
                this.showToast("Pronunciation Practice Completed! 80 XP awarded.");
                Storage.addXp(80);
                Storage.unlockAchievement('orator');
                this.state.activeTab = 'landing';
                this.render('view-content');
            }
        });

        const retryBtn = document.getElementById('pron-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.state.lastTranscript = '';
                this.render('view-content');
            });
        }
    },

    gradePronunciation(spoken) {
        const target = pronunciationPrompts[this.state.pronounceIdx];
        
        // Clean texts
        const clean = (t) => t.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);
        const targetWords = clean(target);
        const spokenWords = clean(spoken);
        
        // Count exact matches
        let matches = 0;
        targetWords.forEach(w => {
            if (spokenWords.includes(w)) {
                matches++;
            }
        });
        
        const accuracy = Math.round((matches / targetWords.length) * 100);
        
        // Render accuracy
        const scoreCard = document.getElementById('pron-score-card');
        const accuracyVal = document.getElementById('pron-accuracy-val');
        const gradeMsg = document.getElementById('pron-grade-message');
        const retryBtn = document.getElementById('pron-retry-btn');
        
        if (scoreCard) scoreCard.style.display = 'block';
        if (accuracyVal) accuracyVal.innerText = `${accuracy}%`;
        if (retryBtn) retryBtn.style.display = 'inline-flex';
        
        Storage.incrementPronunciation();
        
        if (accuracy >= 80) {
            accuracyVal.style.color = 'var(--success)';
            if (gradeMsg) gradeMsg.innerHTML = `<span style="color:var(--success); font-weight:700">Excellent pronunciation!</span> You spoke clearly and enunciated correctly. Good job.`;
            
            const results = Storage.addXp(30);
            this.showToast("+30 XP! Pronunciation criteria passed.");
            if (results.leveledUp) {
                this.showToast(`Level Up! You are now level ${results.newLevel}!`);
            }
        } else {
            accuracyVal.style.color = 'var(--error)';
            if (gradeMsg) gradeMsg.innerHTML = `<span style="color:var(--error); font-weight:700">Practice recommended.</span> Some terms were missed. Click retry and try speaking slower.`;
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
