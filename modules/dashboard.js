// AuraEnglish Dashboard Module
import { Storage } from './storage.js';

export const Dashboard = {
    render(containerId, navigateTo) {
        const container = document.getElementById(containerId);
        const state = Storage.getState();
        
        // Dynamic advice based on user's targetGoal
        let welcomeTips = '';
        if (state.user.targetGoal === 'MNC Preparation') {
            welcomeTips = "Focus on the <strong>MNC Interview Prep</strong> module. Practice structuring your answers using the STAR worksheet to sound professional and concise.";
        } else if (state.user.targetGoal === 'Competitive Exams') {
            welcomeTips = "Visit the <strong>Exam Center</strong>. Start with high-frequency Vocabulary flashcards and Grammar quizzes daily to boost your verbal score.";
        } else {
            welcomeTips = "Try out <strong>Role-Play & Speech</strong>. Speak aloud in the Pronunciation Trainer to practice clear pronunciation and active vocabulary.";
        }

        const levelName = this.getLevelName(state.user.level);
        
        container.innerHTML = `
            <div class="view-title-container">
                <h1 class="view-title">Welcome back, ${state.user.name}!</h1>
                <p class="view-subtitle">Track your learning metrics, manage your settings, and inspect your badges.</p>
            </div>
            
            <div class="dashboard-grid">
                <!-- Main panel: Welcome, stats, graph -->
                <div class="dashboard-main">
                    <div class="glass-card welcome-card">
                        <div class="welcome-content">
                            <h2>Your Daily Learning Path</h2>
                            <p>${welcomeTips}</p>
                            <button class="btn-primary" id="dash-start-action">
                                <span>Start Practice</span>
                                <i data-lucide="arrow-right"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="stats-row">
                        <div class="glass-card stat-item">
                            <div class="stat-icon-wrapper green">
                                <i data-lucide="zap"></i>
                            </div>
                            <div class="stat-val-container">
                                <span class="stat-value" id="dash-xp">${state.xp}</span>
                                <span class="stat-label">Total XP</span>
                            </div>
                        </div>
                        <div class="glass-card stat-item">
                            <div class="stat-icon-wrapper amber">
                                <i data-lucide="flame"></i>
                            </div>
                            <div class="stat-val-container">
                                <span class="stat-value" id="dash-streak">${state.streak} Days</span>
                                <span class="stat-label">Active Streak</span>
                            </div>
                        </div>
                        <div class="glass-card stat-item">
                            <div class="stat-icon-wrapper blue">
                                <i data-lucide="graduation-cap"></i>
                            </div>
                            <div class="stat-val-container">
                                <span class="stat-value" id="dash-level">${state.user.level}</span>
                                <span class="stat-label">${levelName}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Daily 5-Minute English Booster -->
                    <div class="glass-card" style="margin-top: 0px; padding: 28px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <h3 style="font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                                <i data-lucide="zap" style="color: var(--warning); fill: var(--warning); width: 20px; height: 20px;"></i>
                                Daily 5-Minute Booster
                            </h3>
                            <span id="booster-status-tag" class="word-pos" style="${Storage.hasClaimedDailyBooster() ? 'background: var(--success-glow); color: var(--success);' : 'background: var(--accent-purple-glow); color: var(--accent-purple);'}">
                                ${Storage.hasClaimedDailyBooster() ? 'Booster Claimed 🎉 (+30 XP)' : '30 XP Available'}
                            </span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                            <!-- Word of day -->
                            <div style="background: rgba(255,255,255,0.02); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                                <span class="text-muted" style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--accent-teal);">Word of the Day</span>
                                <h4 style="font-size: 1.25rem; font-weight: 800; margin: 8px 0 4px 0;">Pragmatic <span style="font-size: 0.85rem; font-weight: 400; color: var(--text-muted);">/præɡˈmæt.ɪk/</span></h4>
                                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">Practical and sensible. (Tamil: நடைமுறைக்கேற்ற / எதார்த்தமான)</p>
                                <p style="font-size: 0.8rem; font-style: italic; color: var(--text-muted);">"Taking a pragmatic approach is better than arguing over theories."</p>
                            </div>
                            
                            <!-- Phrase of day -->
                            <div style="background: rgba(255,255,255,0.02); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                                <span class="text-muted" style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--accent-purple);">Phrase of the Day</span>
                                <h4 style="font-size: 1.25rem; font-weight: 800; margin: 8px 0 4px 0;">Hit the ground running</h4>
                                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">Start a new activity rapidly and with high energy. (Tamil: ஒரு புதிய பணியை முழு வேகத்துடன் உடனடியாக தொடங்குதல்)</p>
                                <p style="font-size: 0.8rem; font-style: italic; color: var(--text-muted);">"The new developer hit the ground running by coding custom scripts."</p>
                            </div>
                        </div>
                        
                        <div id="booster-quiz-container" style="background: rgba(255,255,255,0.01); border: 1px dashed var(--border-color); border-radius: var(--radius-md); padding: 20px;">
                            ${Storage.hasClaimedDailyBooster() ? `
                                <div style="text-align: center; color: var(--success); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                    <i data-lucide="check-circle" style="width: 22px; height: 22px;"></i>
                                    You have completed today's daily 5-minute booster! Come back tomorrow for new challenges.
                                </div>
                            ` : `
                                <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 12px;">Quick Challenge: What is the meaning of the idiom "Spill the beans"?</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;" id="booster-options">
                                    <button class="btn-secondary booster-opt-btn" data-correct="false" style="padding: 10px; font-size: 0.85rem; justify-content: flex-start;">A) To drop kitchen ingredients</button>
                                    <button class="btn-secondary booster-opt-btn" data-correct="true" style="padding: 10px; font-size: 0.85rem; justify-content: flex-start;">B) To reveal a secret</button>
                                    <button class="btn-secondary booster-opt-btn" data-correct="false" style="padding: 10px; font-size: 0.85rem; justify-content: flex-start;">C) To complain about work</button>
                                    <button class="btn-secondary booster-opt-btn" data-correct="false" style="padding: 10px; font-size: 0.85rem; justify-content: flex-start;">D) To cook a hot meal</button>
                                </div>
                            `}
                        </div>
                    </div>
                    
                    <div class="glass-card chart-card">
                        <div class="chart-header">
                            <h3>Weekly Activity Index</h3>
                            <span class="text-muted" style="font-size: 0.85rem;">XP per Day</span>
                        </div>
                        <div class="chart-placeholder">
                            ${this.generateChartBars(state.xp)}
                        </div>
                    </div>
                </div>
                
                <!-- Side panel: profile config, achievements -->
                <div class="dashboard-side">
                    <div class="glass-card profile-setup-card">
                        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 20px;">
                            <i data-lucide="settings" style="width: 18px; height: 18px; color: var(--accent-purple); vertical-align: middle; margin-right: 8px;"></i>
                            Learning Settings
                        </h3>
                        <div class="input-group">
                            <label for="profile-name-input">Your Name</label>
                            <input type="text" id="profile-name-input" value="${state.user.name}" placeholder="Enter your name...">
                        </div>
                        <div class="input-group">
                            <label for="profile-goal-select">Core Objective</label>
                            <select id="profile-goal-select">
                                <option value="MNC Preparation" ${state.user.targetGoal === 'MNC Preparation' ? 'selected' : ''}>MNC Interview Prep</option>
                                <option value="Competitive Exams" ${state.user.targetGoal === 'Competitive Exams' ? 'selected' : ''}>Competitive Exams</option>
                                <option value="Conversational" ${state.user.targetGoal === 'Conversational' ? 'selected' : ''}>Daily Conversation</option>
                            </select>
                        </div>
                        <button class="btn-primary" style="width: 100%; justify-content: center;" id="save-profile-btn">
                            Save Changes
                        </button>
                    </div>

                    <div class="glass-card side-card">
                        <h3><i data-lucide="award"></i> Achievements</h3>
                        <div class="badge-list">
                            ${state.achievements.map(ach => `
                                <div class="badge-item ${ach.unlocked ? '' : 'locked'}">
                                    <div class="badge-icon-wrapper">${ach.icon}</div>
                                    <div class="badge-info">
                                        <span class="badge-name">${ach.name}</span>
                                        <span class="badge-desc">${ach.desc}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons();
        this.bindEvents(navigateTo);
    },
    
    getLevelName(level) {
        if (level === 1) return 'Novice';
        if (level === 2) return 'Intermediate';
        if (level === 3) return 'Advanced';
        return 'Professional';
    },

    generateChartBars(xp) {
        // Distribute XP dummy values slightly varying by XP
        const baseValues = [40, 20, 10, 80, 50, 30, 0];
        const todayIdx = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
        
        // Add current user activity to today's bar
        baseValues[todayIdx] = Math.min(100, (xp % 500) / 5); 
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        return days.map((day, idx) => {
            const height = Math.max(5, baseValues[idx]);
            return `
                <div class="chart-bar-container">
                    <div class="chart-bar" style="height: ${height}%; ${idx === todayIdx ? 'background: linear-gradient(to top, var(--accent-purple), var(--accent-purple)); border: 1px solid var(--accent-teal);' : ''}"></div>
                    <span class="chart-bar-label">${day}</span>
                </div>
            `;
        }).join('');
    },

    bindEvents(navigateTo) {
        // Start Practice button event handler
        const startBtn = document.getElementById('dash-start-action');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                const state = Storage.getState();
                if (state.user.targetGoal === 'MNC Preparation') {
                    navigateTo('interview');
                } else if (state.user.targetGoal === 'Competitive Exams') {
                    navigateTo('exams');
                } else {
                    navigateTo('conversation');
                }
            });
        }
        
        // Save profile settings event handler
        const saveProfileBtn = document.getElementById('save-profile-btn');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', () => {
                const nameInput = document.getElementById('profile-name-input');
                const goalSelect = document.getElementById('profile-goal-select');
                
                if (nameInput && goalSelect) {
                    const name = nameInput.value.trim() || 'Learner';
                    const goal = goalSelect.value;
                    
                    Storage.updateUserProfile(name, goal);
                    
                    // Update main layouts
                    document.getElementById('user-name-display').innerText = name;
                    
                    // Trigger toast notification
                    const toast = document.getElementById('toast');
                    const toastMessage = document.getElementById('toast-message');
                    if (toast && toastMessage) {
                        toastMessage.innerText = "Settings updated successfully!";
                        toast.classList.remove('hidden');
                        setTimeout(() => {
                            toast.classList.add('hidden');
                        }, 3000);
                    }
                    
                    // Re-render dashboard to update welcome advice & charts
                    this.render('view-content', navigateTo);
                }
            });
        }

        // Daily booster quiz choice event handler
        const boosterOpts = document.querySelectorAll('.booster-opt-btn');
        boosterOpts.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isCorrect = e.currentTarget.getAttribute('data-correct') === 'true';
                if (isCorrect) {
                    const res = Storage.claimDailyBooster();
                    
                    const toast = document.getElementById('toast');
                    const toastMessage = document.getElementById('toast-message');
                    if (toast && toastMessage) {
                        toastMessage.innerText = "+30 XP! Correct match! Streak maintained.";
                        toast.classList.remove('hidden');
                        setTimeout(() => {
                            toast.classList.add('hidden');
                        }, 3000);
                    }
                    
                    // Re-render dashboard
                    this.render('view-content', navigateTo);
                } else {
                    e.currentTarget.style.backgroundColor = 'var(--error-glow)';
                    e.currentTarget.style.borderColor = 'var(--error)';
                    
                    const toast = document.getElementById('toast');
                    const toastMessage = document.getElementById('toast-message');
                    if (toast && toastMessage) {
                        toastMessage.innerText = "Incorrect choice. Try again!";
                        toast.classList.remove('hidden');
                        setTimeout(() => {
                            toast.classList.add('hidden');
                        }, 2000);
                    }
                }
            });
        });
    }
};
