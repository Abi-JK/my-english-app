// AuraEnglish Storage & State Management Module

const STATE_KEY = 'aura_english_state';

const defaultState = {
    user: {
        name: 'Learner',
        level: 1, // 1: Novice, 2: Intermediate, 3: Advanced, 4: Professional
        targetGoal: 'MNC Preparation' // MNC Preparation, Competitive Exams, Conversational
    },
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    dailyBoosterClaimedDate: null,
    achievements: [
        { id: 'first_steps', name: 'First Steps', desc: 'Initialize your learning path', unlocked: true, icon: '🚀' },
        { id: 'streak_3', name: 'Dedicated Learner', desc: 'Maintain a 3-day learning streak', unlocked: false, icon: '🔥' },
        { id: 'quiz_master', name: 'Quiz Master', desc: 'Score 100% on any practice quiz', unlocked: false, icon: '🧠' },
        { id: 'interviewer', name: 'Ready for MNC', desc: 'Complete a full mock interview session', unlocked: false, icon: '👔' },
        { id: 'orator', name: 'Fluent Orator', desc: 'Score above 80% on pronunciation practice', unlocked: false, icon: '🗣️' }
    ],
    completedQuizzes: {}, // quizId: { highscore: X, count: Y }
    starResponses: [], // Array of saved star method worksheets
    pronunciationAttempts: 0
};

export const Storage = {
    getState() {
        const stateStr = localStorage.getItem(STATE_KEY);
        if (!stateStr) {
            this.saveState(defaultState);
            return defaultState;
        }
        
        // Ensure compatibility if defaultState structure expands
        try {
            const parsed = JSON.parse(stateStr);
            const merged = { ...defaultState, ...parsed };
            merged.user = { ...defaultState.user, ...parsed.user };
            // Ensure achievements array preserves items
            merged.achievements = defaultState.achievements.map(defaultAch => {
                const existing = parsed.achievements?.find(a => a.id === defaultAch.id);
                return existing ? { ...defaultAch, unlocked: existing.unlocked } : defaultAch;
            });
            return merged;
        } catch (e) {
            return defaultState;
        }
    },

    saveState(state) {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
    },

    addXp(amount) {
        const state = this.getState();
        state.xp += amount;
        
        // Calculate Level threshold (e.g. 500 XP per level)
        const oldLevel = state.user.level;
        state.user.level = Math.floor(state.xp / 500) + 1;
        
        this.saveState(state);
        
        // Return if user leveled up
        return {
            leveledUp: state.user.level > oldLevel,
            newLevel: state.user.level,
            xp: state.xp
        };
    },

    updateStreak() {
        const state = this.getState();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (state.lastActiveDate === today) {
            // Already active today, streak stays the same
            return state.streak;
        }
        
        if (state.lastActiveDate === yesterday) {
            state.streak += 1;
        } else if (state.lastActiveDate === null || state.lastActiveDate !== today) {
            state.streak = 1;
        }
        
        state.lastActiveDate = today;
        
        // Unlock streak achievement if conditions are met
        if (state.streak >= 3) {
            this.unlockAchievementInternal(state, 'streak_3');
        }
        
        this.saveState(state);
        return state.streak;
    },

    unlockAchievement(id) {
        const state = this.getState();
        const unlocked = this.unlockAchievementInternal(state, id);
        if (unlocked) {
            this.saveState(state);
            return true;
        }
        return false;
    },

    unlockAchievementInternal(state, id) {
        const ach = state.achievements.find(a => a.id === id);
        if (ach && !ach.unlocked) {
            ach.unlocked = true;
            return true;
        }
        return false;
    },

    updateQuizScore(quizId, scorePercentage) {
        const state = this.getState();
        if (!state.completedQuizzes[quizId]) {
            state.completedQuizzes[quizId] = { highscore: 0, count: 0 };
        }
        
        const record = state.completedQuizzes[quizId];
        record.count += 1;
        if (scorePercentage > record.highscore) {
            record.highscore = scorePercentage;
        }
        
        if (scorePercentage === 100) {
            this.unlockAchievementInternal(state, 'quiz_master');
        }
        
        this.saveState(state);
    },

    saveStarResponse(response) {
        const state = this.getState();
        state.starResponses.unshift(response); // Store newest first
        if (state.starResponses.length > 10) {
            state.starResponses.pop(); // Keep last 10
        }
        this.saveState(state);
    },

    incrementPronunciation() {
        const state = this.getState();
        state.pronunciationAttempts = (state.pronunciationAttempts || 0) + 1;
        this.saveState(state);
    },

    updateUserProfile(name, targetGoal) {
        const state = this.getState();
        state.user.name = name || state.user.name;
        state.user.targetGoal = targetGoal || state.user.targetGoal;
        this.saveState(state);
    },

    hasClaimedDailyBooster() {
        const state = this.getState();
        const today = new Date().toDateString();
        return state.dailyBoosterClaimedDate === today;
    },

    claimDailyBooster() {
        const state = this.getState();
        const today = new Date().toDateString();
        state.dailyBoosterClaimedDate = today;
        this.saveState(state);
        return this.addXp(30); // 30 XP for completing daily booster
    }
};
