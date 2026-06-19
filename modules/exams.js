// AuraEnglish Exam Center Module
import { Storage } from './storage.js';

// Flashcard Vocabulary Data
const vocabWords = [
    { word: 'Acumen', pos: 'noun', phonetic: '/əˈkjuː.mən/', meaning: 'The ability to make good judgments and quick decisions.', example: 'Her business acumen helped her land a senior management role at the MNC.' },
    { word: 'Alacrity', pos: 'noun', phonetic: '/əˈlæk.rə.ti/', meaning: 'Brisk and cheerful readiness to do something.', example: 'She accepted the job offer at Google with alacrity.' },
    { word: 'Cognizant', pos: 'adjective', phonetic: '/ˈkɒɡ.nɪ.zənt/', meaning: 'Having knowledge or being fully aware of something.', example: 'Engineers must be cognizant of security regulations when designing databases.' },
    { word: 'Equanimity', pos: 'noun', phonetic: '/ˌek.wəˈnɪm.ə.ti/', meaning: 'Mental calmness and composure, especially in a difficult situation.', example: 'The team lead kept her equanimity even when the project deadline was moved up.' },
    { word: 'Pernicious', pos: 'adjective', phonetic: '/pəˈnɪʃ.əs/', meaning: 'Having a harmful effect, especially in a gradual or subtle way.', example: 'Frequent interruptions can have a pernicious effect on a software engineer\'s focus.' }
];

// TNPSC General English PYQs
const tnpscQuestions = [
    {
        id: 'tnpsc_1',
        question: 'Identify the appropriate prefix to form the antonym of the word "Behave":',
        options: [
            'dis',
            'un',
            'mis',
            'in'
        ],
        answer: 2, // 'mis' -> misbehave
        explanation: 'The prefix "mis-" is added to "behave" to form the antonym "misbehave", which means to behave badly or inappropriately.'
    },
    {
        id: 'tnpsc_2',
        question: 'Choose the correct synonym for the underlined word: "The manager was <u>cognizant</u> of the server downtime risks."',
        options: [
            'ignorant',
            'aware',
            'fearful',
            'remiss'
        ],
        answer: 1, // aware
        explanation: 'Cognizant means having knowledge or being fully aware of something. Hence, "aware" is the correct synonym.'
    },
    {
        id: 'tnpsc_3',
        question: 'Identify the correct sentence pattern: "He wrote a detailed report yesterday."',
        options: [
            'S V O A',
            'S V C A',
            'S V IO DO',
            'S V O'
        ],
        answer: 0, // S V O A
        explanation: '"He" (Subject) + "wrote" (Verb) + "a detailed report" (Object) + "yesterday" (Adjunct/Time marker). The pattern is S V O A.'
    }
];

// SSC / RRB / NTPC Verbal Section PYQs
const sscQuestions = [
    {
        id: 'ssc_1',
        question: 'Spot the grammatical error in the sentence: "No sooner did the train arrived at the platform than the passengers rushed to board it."',
        options: [
            'No sooner did the',
            'train arrived at the',
            'than the passengers',
            'No error'
        ],
        answer: 1, // train arrived at the
        explanation: 'Grammar rule: The auxiliary verb "did" must be followed by the base form of the verb ("arrive"). Thus, "did... arrived" is incorrect. It should be "did... arrive".'
    },
    {
        id: 'ssc_2',
        question: 'Select the word that best fits the blank: "The candidate was so ______ in his review that he spotted three spelling errors in the SLA draft."',
        options: [
            'lethargic',
            'assiduous',
            'dilatory',
            'remiss'
        ],
        answer: 1, // assiduous
        explanation: '"Assiduous" means showing great care, attention, and perseverance. This fits perfectly with a thorough review that catches minor errors.'
    },
    {
        id: 'ssc_3',
        question: 'Fill in the blank with the appropriate preposition: "The cloud company entered ______ a long-term agreement with the state department."',
        options: [
            'into',
            'in',
            'on',
            'with'
        ],
        answer: 0, // into
        explanation: 'The phrasal verb "enter into" is idiomatically used when referring to formally beginning or establishing an agreement, contract, or dialogue.'
    }
];

// MNC Placement Screening Test
const mncQuestions = [
    {
        id: 'mnc_1',
        question: 'Which sentence is grammatically correct and appropriate for formal business communication?',
        options: [
            'We are writing to inform you that we have received your resume and will review it shortly.',
            'We write to tell that we got your CV and will review it soon.',
            'We are sending this email because we got your details and we review it.',
            'We are writing to notify you that we received the CV of yours and we check it.'
        ],
        answer: 0,
        explanation: 'Option A uses appropriate passive/active flow, avoids contractions like "got", and states the message in a clear, polite, and formal tone.'
    },
    {
        id: 'mnc_2',
        question: 'Identify the word with a spelling error from the list of corporate assets:',
        options: [
            'Acquisition',
            'Liaison',
            'Accommodation',
            'Maintainance'
        ],
        answer: 3, // Maintainance -> Maintenance
        explanation: 'The spelling is incorrect. The noun form of "maintain" is "maintenance" (no "i" in the second syllable).'
    },
    {
        id: 'mnc_3',
        question: 'What is the corporate meaning of the idiomatic phrase "Bring to the table"?',
        options: [
            'To serve refreshments during board alignments.',
            'To contribute useful skills, expertise, or assets to a discussion or project.',
            'To submit physical documentation to the project director.',
            'To request a delay on project development schedules.'
        ],
        answer: 1,
        explanation: 'In corporate jargon, "bring to the table" refers to contributing value, skills, or items to a project, team, or discussion.'
    }
];

const rcPassage = {
    title: 'The Rise of Asynchronous Communication in Global Teams',
    text: `<p>In modern multinational corporations (MNCs), the traditional model of synchronous communication—characterized by real-time meetings and instant messaging exchanges—is increasingly giving way to asynchronous patterns. This paradigm shift is primarily driven by the expansion of geographically distributed teams operating across disparate time zones. Expecting real-time collaboration between software developers in Bangalore and project managers in San Francisco often results in scheduling bottlenecks and employee fatigue.</p>
           <p>Asynchronous communication allows team members to digest information and respond at their own convenience. It fosters more reflective decision-making, as individuals have the time to formulate considered responses rather than feeling pressured to reply immediately. However, this model requires a high degree of clarity and exhaustiveness in written documentation. Ambiguous specifications or incomplete requests can stall progress for an entire day, since the receiver may not see and clarify the message until the sender has logged off.</p>
           <p>Therefore, clear writing is no longer just a soft skill; it has transitioned into a core engineering requirement. To operate efficiently in a remote-first or hybrid corporate environment, employees must master precise language, state their requirements explicitly, and provide complete context within their communications.</p>`,
    questions: [
        {
            question: 'According to the passage, what is the primary catalyst driving the shift toward asynchronous communication?',
            options: [
                'The desire of corporate managers to reduce employee social interactions.',
                'The geographical dispersion of teams working across different time zones.',
                'A general decline in the effectiveness of instant messaging applications.',
                'The need to speed up immediate developer response rates.'
            ],
            answer: 1,
            explanation: 'The text states: "This paradigm shift is primarily driven by the expansion of geographically distributed teams operating across disparate time zones."'
        },
        {
            question: 'What potential drawback of asynchronous communication does the author highlight?',
            options: [
                'It leads to an increase in real-time meetings and status reports.',
                'It reduces the overall quality of written software specifications.',
                'Vague or incomplete communications can cause significant project delays.',
                'It limits the cognitive reflection time allowed for response drafting.'
            ],
            answer: 2,
            explanation: 'The passage cautions that "Ambiguous specifications or incomplete requests can stall progress for an entire day, since the receiver may not see and clarify the message until the sender has logged off."'
        }
    ]
};

export const Exams = {
    state: {
        activeTab: 'landing', // 'landing', 'vocab', 'quiz', 'rc'
        activeCategory: '', // 'tnpsc', 'ssc', 'mnc'
        vocabIdx: 0,
        vocabFlipped: false,
        quizIdx: 0,
        quizScore: 0,
        quizAnswers: [],
        quizSubmitted: false,
        rcIdx: 0,
        rcScore: 0,
        rcAnswers: [],
        rcSubmitted: false,
        highlighterActive: false,
        timerInterval: null
    },

    render(containerId, navigateTo) {
        const container = document.getElementById(containerId);
        
        if (this.state.activeTab === 'landing') {
            this.renderLanding(container);
        } else if (this.state.activeTab === 'vocab') {
            this.renderVocab(container);
        } else if (this.state.activeTab === 'quiz') {
            this.renderQuiz(container);
        } else if (this.state.activeTab === 'rc') {
            this.renderRC(container);
        }
        
        lucide.createIcons();
    },

    renderLanding(container) {
        container.innerHTML = `
            <div class="view-title-container">
                <h1 class="view-title">Verbal & Exam Prep Center</h1>
                <p class="view-subtitle">Solve Previous Years' Questions (PYQ) and repetitive vocabulary cards customized for competitive exams.</p>
            </div>
            
            <div class="exams-layout" style="grid-template-columns: repeat(3, 1fr); gap: 24px;">
                <div class="glass-card feature-selector-card" id="select-tnpsc-btn">
                    <div class="feature-icon-box" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">
                        <i data-lucide="building" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>TNPSC General English</h3>
                    <p>Practice repetitive grammar syllabus, sentence patterns, and suffix/prefix matching. Features PYQs to maximize state exam scores.</p>
                </div>

                <div class="glass-card feature-selector-card" id="select-ssc-btn">
                    <div class="feature-icon-box" style="background: rgba(6, 182, 212, 0.1); color: var(--accent-teal);">
                        <i data-lucide="subtitles" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>SSC / RRB / NTPC Prep</h3>
                    <p>Master central government verbal mock quizzes. Focus on error spotting, prepositions, spelling corrections, and synonyms.</p>
                </div>

                <div class="glass-card feature-selector-card" id="select-mnc-btn">
                    <div class="feature-icon-box" style="background: rgba(139, 92, 246, 0.1); color: var(--accent-purple);">
                        <i data-lucide="briefcase" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>MNC Screening & Aptitude</h3>
                    <p>Ace written verbal screening blocks. Solve corporate communication corrections, business vocabulary, and professional idioms.</p>
                </div>

                <div class="glass-card feature-selector-card" id="select-vocab-btn" style="grid-column: span 1.5;">
                    <div class="feature-icon-box">
                        <i data-lucide="book-open" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>General Vocabulary Flashcards</h3>
                    <p>Learn 3000+ high-frequency verbal phrases using spacing repetition algorithms. Flip cards to see meanings and phonetic symbols.</p>
                </div>

                <div class="glass-card feature-selector-card" id="select-rc-btn" style="grid-column: span 2;">
                    <div class="feature-icon-box">
                        <i data-lucide="scroll" style="width: 28px; height: 28px;"></i>
                    </div>
                    <h3>Reading Comprehension</h3>
                    <p>Practice comprehensive reading. Highlights important details in text paragraphs on split-pane windows and answers analytical queries.</p>
                </div>
            </div>
        `;
        
        // Setup Category and Option button handlers
        document.getElementById('select-tnpsc-btn').addEventListener('click', () => {
            this.startQuiz('tnpsc');
        });
        
        document.getElementById('select-ssc-btn').addEventListener('click', () => {
            this.startQuiz('ssc');
        });
        
        document.getElementById('select-mnc-btn').addEventListener('click', () => {
            this.startQuiz('mnc');
        });

        document.getElementById('select-vocab-btn').addEventListener('click', () => {
            this.state.activeTab = 'vocab';
            this.state.vocabIdx = 0;
            this.state.vocabFlipped = false;
            this.render('view-content');
        });
        
        document.getElementById('select-rc-btn').addEventListener('click', () => {
            this.state.activeTab = 'rc';
            this.state.rcIdx = 0;
            this.state.rcScore = 0;
            this.state.rcSubmitted = false;
            this.state.rcAnswers = [];
            this.state.highlighterActive = false;
            this.render('view-content');
        });
    },

    startQuiz(category) {
        this.state.activeTab = 'quiz';
        this.state.activeCategory = category;
        this.state.quizIdx = 0;
        this.state.quizScore = 0;
        this.state.quizAnswers = [];
        this.state.quizSubmitted = false;
        this.render('view-content');
    },

    getQuestionsForCategory() {
        if (this.state.activeCategory === 'tnpsc') return tnpscQuestions;
        if (this.state.activeCategory === 'ssc') return sscQuestions;
        return mncQuestions;
    },

    getCategoryTitle() {
        if (this.state.activeCategory === 'tnpsc') return 'TNPSC General English';
        if (this.state.activeCategory === 'ssc') return 'SSC / RRB / NTPC Verbal Prep';
        return 'MNC Screening & Aptitude';
    },

    renderQuiz(container) {
        const questions = this.getQuestionsForCategory();
        const q = questions[this.state.quizIdx];
        const progress = (this.state.quizIdx / questions.length) * 100;
        
        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 class="view-title">${this.getCategoryTitle()}</h1>
                    <p class="view-subtitle">Previous Years' & High-Frequency Repeat Questions. Question ${this.state.quizIdx + 1} of ${questions.length}</p>
                </div>
                <button class="btn-secondary" id="quiz-back-btn">
                    <i data-lucide="arrow-left"></i> Back to Center
                </button>
            </div>
            
            <div class="glass-card" style="max-width: 800px; margin: 0 auto; width: 100%;">
                <div class="quiz-progress-bar" style="margin-bottom: 24px;">
                    <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                </div>
                
                <div class="quiz-question-card">
                    <h3 style="line-height: 1.6;">${q.question}</h3>
                    
                    <div class="options-list" style="margin-top: 20px;">
                        ${q.options.map((opt, idx) => {
                            let btnClass = '';
                            let icon = '';
                            
                            if (this.state.quizSubmitted) {
                                const selectedIdx = this.state.quizAnswers[this.state.quizIdx];
                                if (idx === q.answer) {
                                    btnClass = 'correct';
                                    icon = '<i data-lucide="check" style="width: 14px; height: 14px; color: white;"></i>';
                                } else if (selectedIdx === idx) {
                                    btnClass = 'wrong';
                                    icon = '<i data-lucide="x" style="width: 14px; height: 14px; color: white;"></i>';
                                }
                            } else {
                                const selectedIdx = this.state.quizAnswers[this.state.quizIdx];
                                if (selectedIdx === idx) {
                                    btnClass = 'selected';
                                }
                            }
                            
                            return `
                                <button class="option-btn ${btnClass}" data-idx="${idx}" ${this.state.quizSubmitted ? 'disabled' : ''}>
                                    <span>${opt}</span>
                                    <div class="option-indicator">${icon}</div>
                                </button>
                            `;
                        }).join('')}
                    </div>
                    
                    ${this.state.quizSubmitted ? `
                        <div class="quiz-explanation-box">
                            <strong>Explanation (விளக்கம்):</strong> ${q.explanation}
                        </div>
                    ` : ''}
                </div>
                
                <div class="quiz-footer">
                    <span class="text-muted" id="quiz-score-indicator">Current Score: ${this.state.quizScore}/${questions.length}</span>
                    
                    ${!this.state.quizSubmitted ? `
                        <button class="btn-primary" id="quiz-submit-btn" disabled>
                            <span>Submit Answer</span>
                            <i data-lucide="check-circle-2"></i>
                        </button>
                    ` : `
                        <button class="btn-primary" id="quiz-next-btn">
                            <span>${this.state.quizIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                            <i data-lucide="arrow-right"></i>
                        </button>
                    `}
                </div>
            </div>
        `;
        
        document.getElementById('quiz-back-btn').addEventListener('click', () => {
            this.state.activeTab = 'landing';
            this.render('view-content');
        });

        const optionBtns = container.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                this.state.quizAnswers[this.state.quizIdx] = idx;
                
                optionBtns.forEach(b => b.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                
                document.getElementById('quiz-submit-btn').removeAttribute('disabled');
            });
        });
        
        const submitBtn = document.getElementById('quiz-submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answer = this.state.quizAnswers[this.state.quizIdx];
                const correct = questions[this.state.quizIdx].answer;
                
                this.state.quizSubmitted = true;
                if (answer === correct) {
                    this.state.quizScore++;
                    const results = Storage.addXp(35);
                    this.showToast("+35 XP! Correct!");
                    if (results.leveledUp) {
                        this.showToast(`Level Up! You are now level ${results.newLevel}!`);
                    }
                } else {
                    this.showToast("Incorrect answer. Inspect the explanation.");
                }
                
                this.render('view-content');
            });
        }
        
        const nextBtn = document.getElementById('quiz-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.state.quizIdx < questions.length - 1) {
                    this.state.quizIdx++;
                    this.state.quizSubmitted = false;
                    this.render('view-content');
                } else {
                    const percentage = Math.round((this.state.quizScore / questions.length) * 100);
                    Storage.updateQuizScore(this.state.activeCategory + '_quiz', percentage);
                    
                    this.showToast(`Mock quiz complete! Score: ${this.state.quizScore}/${questions.length} (${percentage}%)`);
                    this.state.activeTab = 'landing';
                    this.render('view-content');
                }
            });
        }
    },

    renderVocab(container) {
        const word = vocabWords[this.state.vocabIdx];
        
        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h1 class="view-title">Vocab Flashcards</h1>
                    <p class="view-subtitle">Word ${this.state.vocabIdx + 1} of ${vocabWords.length}</p>
                </div>
                <button class="btn-secondary" id="vocab-back-btn">
                    <i data-lucide="arrow-left"></i> Back to Center
                </button>
            </div>
            
            <div class="vocab-center-container">
                <div class="flashcard-wrapper">
                    <div class="flashcard ${this.state.vocabFlipped ? 'flipped' : ''}" id="flashcard-element">
                        <!-- Front Face -->
                        <div class="card-face front">
                            <span class="vocab-tag">Vocabulary Acquisition</span>
                            <h2 class="word-title">${word.word}</h2>
                            <p class="word-phonetic">${word.phonetic}</p>
                            <p class="word-hint"><i data-lucide="help-circle" style="width: 16px; height: 16px;"></i> Click card to flip and view meaning</p>
                        </div>
                        
                        <!-- Back Face -->
                        <div class="card-face back">
                            <span class="word-pos">${word.pos}</span>
                            <p class="word-meaning">${word.meaning}</p>
                            <p class="word-example">" ${word.example} "</p>
                        </div>
                    </div>
                </div>
                
                <div class="vocab-actions">
                    <button class="btn-dont-know" id="btn-vocab-dont-know">
                        <i data-lucide="x"></i> Still Learning
                    </button>
                    <button class="btn-know" id="btn-vocab-know">
                        <i data-lucide="check"></i> I Know This
                    </button>
                </div>
            </div>
        `;
        
        const flashcard = document.getElementById('flashcard-element');
        flashcard.addEventListener('click', () => {
            this.state.vocabFlipped = !this.state.vocabFlipped;
            if (this.state.vocabFlipped) {
                flashcard.classList.add('flipped');
            } else {
                flashcard.classList.remove('flipped');
            }
        });
        
        document.getElementById('vocab-back-btn').addEventListener('click', () => {
            this.state.activeTab = 'landing';
            this.render('view-content');
        });
        
        const handleVocabChoice = (known) => {
            if (known) {
                const results = Storage.addXp(25);
                this.showToast("+25 XP gained!");
                if (results.leveledUp) {
                    this.showToast(`Level Up! You are now level ${results.newLevel}!`);
                }
            }
            
            this.state.vocabFlipped = false;
            if (this.state.vocabIdx < vocabWords.length - 1) {
                this.state.vocabIdx++;
                this.render('view-content');
            } else {
                this.showToast("All flashcards completed for this session!");
                this.state.activeTab = 'landing';
                this.render('view-content');
            }
        };
        
        document.getElementById('btn-vocab-dont-know').addEventListener('click', () => handleVocabChoice(false));
        document.getElementById('btn-vocab-know').addEventListener('click', () => handleVocabChoice(true));
    },

    renderRC(container) {
        const q = rcPassage.questions[this.state.rcIdx];
        
        container.innerHTML = `
            <div class="view-title-container" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h1 class="view-title">Reading Comprehension</h1>
                    <p class="view-subtitle">Read the article and solve the queries. Passage active timer.</p>
                </div>
                <button class="btn-secondary" id="rc-back-btn">
                    <i data-lucide="arrow-left"></i> Back to Center
                </button>
            </div>
            
            <div class="glass-card rc-container">
                <!-- Left panel: Text passage -->
                <div class="rc-passage-panel">
                    <div class="rc-passage-header">
                        <h3 style="font-size: 1.15rem; font-weight: 700; max-width: 60%;">${rcPassage.title}</h3>
                        <button class="rc-highlight-tool ${this.state.highlighterActive ? 'active' : ''}" id="highlighter-toggle">
                            <i data-lucide="highlighter"></i>
                            <span>${this.state.highlighterActive ? 'Highlighter On' : 'Highlighter Off'}</span>
                        </button>
                    </div>
                    <div class="rc-passage-content" id="rc-passage-body">
                        ${rcPassage.text}
                    </div>
                </div>
                
                <!-- Right panel: Interactive MCQs -->
                <div class="rc-questions-panel">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="text-muted" style="font-size: 0.85rem; font-weight: 600;">Question ${this.state.rcIdx + 1} of ${rcPassage.questions.length}</span>
                        <div class="timer-box" style="font-size: 1rem;"><i data-lucide="clock" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i> <span id="rc-timer">00:00</span></div>
                    </div>
                    
                    <div class="quiz-question-card">
                        <h3>${q.question}</h3>
                        
                        <div class="options-list">
                            ${q.options.map((opt, idx) => {
                                let btnClass = '';
                                let icon = '';
                                
                                if (this.state.rcSubmitted) {
                                    const selectedIdx = this.state.rcAnswers[this.state.rcIdx];
                                    if (idx === q.answer) {
                                        btnClass = 'correct';
                                        icon = '<i data-lucide="check" style="width: 14px; height: 14px; color: white;"></i>';
                                    } else if (selectedIdx === idx) {
                                        btnClass = 'wrong';
                                        icon = '<i data-lucide="x" style="width: 14px; height: 14px; color: white;"></i>';
                                    }
                                } else {
                                    const selectedIdx = this.state.rcAnswers[this.state.rcIdx];
                                    if (selectedIdx === idx) {
                                        btnClass = 'selected';
                                    }
                                }
                                
                                return `
                                    <button class="option-btn ${btnClass}" data-idx="${idx}" ${this.state.rcSubmitted ? 'disabled' : ''}>
                                        <span>${opt}</span>
                                        <div class="option-indicator">${icon}</div>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                        
                        ${this.state.rcSubmitted ? `
                            <div class="quiz-explanation-box">
                                <strong>Explanation:</strong> ${q.explanation}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="quiz-footer">
                        <span class="text-muted">Current Score: ${this.state.rcScore}/${rcPassage.questions.length}</span>
                        
                        ${!this.state.rcSubmitted ? `
                            <button class="btn-primary" id="rc-submit-btn" disabled>
                                <span>Submit Answer</span>
                                <i data-lucide="check-circle-2"></i>
                            </button>
                        ` : `
                            <button class="btn-primary" id="rc-next-btn">
                                <span>${this.state.rcIdx === rcPassage.questions.length - 1 ? 'Finish Practice' : 'Next Question'}</span>
                                <i data-lucide="arrow-right"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        this.startRcTimer();
        this.bindRcEvents(container);
    },

    startRcTimer() {
        this.stopRcTimer();
        
        let seconds = 0;
        const timerSpan = document.getElementById('rc-timer');
        
        this.timerInterval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            if (timerSpan) {
                timerSpan.innerText = `${mins}:${secs}`;
            }
        }, 1000);
    },

    stopRcTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    bindRcEvents(container) {
        document.getElementById('rc-back-btn').addEventListener('click', () => {
            this.stopRcTimer();
            this.state.activeTab = 'landing';
            this.render('view-content');
        });

        const highlighterToggle = document.getElementById('highlighter-toggle');
        const passageBody = document.getElementById('rc-passage-body');
        
        highlighterToggle.addEventListener('click', () => {
            this.state.highlighterActive = !this.state.highlighterActive;
            highlighterToggle.classList.toggle('active', this.state.highlighterActive);
            
            if (this.state.highlighterActive) {
                passageBody.style.cursor = 'crosshair';
            } else {
                passageBody.style.cursor = 'default';
            }
        });

        passageBody.addEventListener('mouseup', () => {
            if (!this.state.highlighterActive) return;
            
            const selection = window.getSelection();
            if (!selection.rangeCount || selection.isCollapsed) return;
            
            const range = selection.getRangeAt(0);
            
            if (!passageBody.contains(range.commonAncestorContainer)) return;
            
            const span = document.createElement('span');
            span.className = 'highlighted-text';
            
            try {
                range.surroundContents(span);
                selection.removeAllRanges();
            } catch (e) {
                console.warn('Selection cross-over occurred.');
            }
        });

        const optionBtns = container.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
                this.state.rcAnswers[this.state.rcIdx] = idx;
                
                optionBtns.forEach(b => b.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                
                document.getElementById('rc-submit-btn').removeAttribute('disabled');
            });
        });

        const submitBtn = document.getElementById('rc-submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answer = this.state.rcAnswers[this.state.rcIdx];
                const correct = rcPassage.questions[this.state.rcIdx].answer;
                
                this.state.rcSubmitted = true;
                if (answer === correct) {
                    this.state.rcScore++;
                    const results = Storage.addXp(50);
                    this.showToast("+50 XP! Core answer matched!");
                    if (results.leveledUp) {
                        this.showToast(`Level Up! You are now level ${results.newLevel}!`);
                    }
                } else {
                    this.showToast("Incorrect answer. Examine the explanation panel.");
                }
                
                this.render('view-content');
            });
        }

        const nextBtn = document.getElementById('rc-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.state.rcIdx < rcPassage.questions.length - 1) {
                    this.state.rcIdx++;
                    this.state.rcSubmitted = false;
                    this.render('view-content');
                } else {
                    this.stopRcTimer();
                    const percentage = Math.round((this.state.rcScore / rcPassage.questions.length) * 100);
                    Storage.updateQuizScore('rc_passage_1', percentage);
                    
                    this.showToast(`Reading Practice completed! Final Score: ${this.state.rcScore}/${rcPassage.questions.length}`);
                    this.state.activeTab = 'landing';
                    this.render('view-content');
                }
            });
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
