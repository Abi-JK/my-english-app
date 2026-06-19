// AuraEnglish Main Orchestrator and Router
import { Storage } from './modules/storage.js';
import { Dashboard } from './modules/dashboard.js';
import { Exams } from './modules/exams.js';
import { Interview } from './modules/interview.js';
import { Conversation } from './modules/conversation.js';

// Application State Router
const Router = {
    currentRoute: 'dashboard',
    modules: {
        dashboard: Dashboard,
        exams: Exams,
        interview: Interview,
        conversation: Conversation
    },

    init() {
        // Load initial state & update streak
        const state = Storage.getState();
        const updatedStreak = Storage.updateStreak();
        
        // Synchronize display metrics in header
        this.updateHeaderMetrics(state.xp, updatedStreak);
        this.updateSidebarUser(state.user.name, state.user.level);
        
        // Setup Route click handlers
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetRoute = e.currentTarget.getAttribute('data-target');
                this.navigate(targetRoute);
                
                // Close sidebar on mobile
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('open');
            });
        });

        // Toggle mobile sidebar drawer
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Setup Theme Toggle
        const themeBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Load stored theme or default to dark
        const storedTheme = localStorage.getItem('aura_theme') || 'dark';
        document.body.setAttribute('data-theme', storedTheme);
        this.updateThemeIcon(storedTheme, themeIcon);

        if (themeBtn && themeIcon) {
            themeBtn.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('aura_theme', newTheme);
                this.updateThemeIcon(newTheme, themeIcon);
                
                // Show brief toast notification
                this.showToast(`Theme switched to ${newTheme} mode!`);
            });
        }

        // Render first view
        this.navigate(this.currentRoute);
    },

    navigate(route) {
        if (!this.modules[route]) return;
        
        this.currentRoute = route;
        
        // Sync active class in sidebar nav
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === route) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Re-read storage state to sync XP & streaks
        const state = Storage.getState();
        this.updateHeaderMetrics(state.xp, state.streak);
        this.updateSidebarUser(state.user.name, state.user.level);

        // Reset modules sub-view landing states when routing
        if (route === 'exams') {
            Exams.state.activeTab = 'landing';
        } else if (route === 'interview') {
            Interview.state.activeTab = 'landing';
        } else if (route === 'conversation') {
            Conversation.state.activeTab = 'landing';
        }

        // Render target module
        this.modules[route].render('view-content', (r) => this.navigate(r));
    },

    updateHeaderMetrics(xp, streak) {
        const streakCount = document.getElementById('streak-count');
        const xpCount = document.getElementById('xp-count');
        
        if (streakCount) streakCount.innerText = `${streak} Day${streak !== 1 ? 's' : ''}`;
        if (xpCount) xpCount.innerText = `${xp} XP`;
    },

    updateSidebarUser(name, level) {
        const nameDisplay = document.getElementById('user-name-display');
        const levelDisplay = document.getElementById('user-level-display');
        
        if (nameDisplay) nameDisplay.innerText = name;
        if (levelDisplay) levelDisplay.innerText = `Level ${level} (${Dashboard.getLevelName(level)})`;
    },

    updateThemeIcon(theme, iconElement) {
        if (!iconElement) return;
        if (theme === 'dark') {
            iconElement.setAttribute('data-lucide', 'sun');
        } else {
            iconElement.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        if (toast && toastMessage) {
            toastMessage.innerText = message;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    }
};

// Initialise Application when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
