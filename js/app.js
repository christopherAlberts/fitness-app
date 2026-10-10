// Fitness App - Main Application Logic

const App = {
  currentScreen: 'today',
  currentWorkout: null,
  currentExerciseIndex: 0,
  timer: null,
  timerRemaining: 0,
  currentSet: 1,
  workoutSets: [],

  init() {
    this.setupNavigation();
    this.setupEventListeners();
    this.loadSettings();
    this.updateGreeting();
    this.renderTodayScreen();
    this.renderPrograms();
    this.renderExercises();
    this.renderProgress();
    
    setInterval(() => this.updateGreeting(), 60000);
  },

  // Navigation
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        this.navigateTo(screen);
      });
    });
  },

  navigateTo(screenName) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screenName);
    });

    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    const screen = document.getElementById(`${screenName}-screen`);
    if (screen) {
      screen.classList.add('active');
      this.currentScreen = screenName;
    }

    if (screenName === 'progress') {
      this.renderCharts();
    }
  },

  // Event Listeners
  setupEventListeners() {
    document.getElementById('settingsBtn').addEventListener('click', () => this.openSettings());
    document.getElementById('closeSettings').addEventListener('click', () => this.closeModal('settingsModal'));
    document.getElementById('darkModeToggle').addEventListener('change', (e) => this.toggleDarkMode(e.target.checked));
    document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());
    document.getElementById('clearDataBtn').addEventListener('click', () => this.clearData());
    
    document.getElementById('startSessionBtn').addEventListener('click', () => this.startTodaySession());
    
    document.querySelectorAll('.quick-start-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type;
        this.startQuickWorkout(type);
      });
    });

    document.querySelectorAll('#programTabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#programTabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderPrograms(tab.dataset.category);
      });
    });

    document.getElementById('exerciseSearch').addEventListener('input', (e) => {
      this.renderExercises(this.getCurrentExerciseFilter(), e.target.value);
    });

    document.querySelectorAll('#exerciseFilters .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#exerciseFilters .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.renderExercises(chip.dataset.filter, document.getElementById('exerciseSearch').value);
      });
    });

    document.getElementById('closeExerciseDetail').addEventListener('click', () => this.closeModal('exerciseDetailModal'));
    document.getElementById('closeProgramDetail').addEventListener('click', () => this.closeModal('programDetailModal'));
    document.getElementById('startProgramBtn').addEventListener('click', () => this.startProgram());
    
    document.getElementById('closePlayer').addEventListener('click', () => this.closeWorkoutPlayer());
    document.getElementById('prevExerciseBtn').addEventListener('click', () => this.prevExercise());
    document.getElementById('nextExerciseBtn').addEventListener('click', () => this.nextExercise());
  },

  getCurrentExerciseFilter() {
    const active = document.querySelector('#exerciseFilters .chip.active');
    return active ? active.dataset.filter : 'all';
  },

  // Greeting & Date
  updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    else if (hour >= 17) greeting = 'Good evening';
    
    document.getElementById('greeting').textContent = `${greeting}, Christopher`;
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('en-ZA', options);
    document.getElementById('dateDisplay').textContent = dateStr;
  },

  // Settings
  loadSettings() {
    const settings = Storage.getSettings();
    document.getElementById('darkModeToggle').checked = settings.darkMode;
    document.body.classList.toggle('light-mode', !settings.darkMode);
  },

  toggleDarkMode(isDark) {
    document.body.classList.toggle('light-mode', !isDark);
    Storage.updateSettings({ darkMode: isDark });
  },

  openSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
  },

  closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
  },

  exportData() {
    const data = Storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Data exported successfully');
  },

  clearData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      Storage.clearAllData();
      this.showToast('All data cleared', 'success');
      setTimeout(() => location.reload(), 1000);
    }
  },

  // Today Screen
  renderTodayScreen() {
    const activeProgram = Storage.getActiveProgram();
    const stats = Storage.getWeeklyStats();

    document.getElementById('weekWorkouts').textContent = stats.workouts;
    document.getElementById('weekDistance').textContent = stats.distance;
    document.getElementById('weekStreak').textContent = stats.streak;

    const programCard = document.getElementById('currentProgramCard');
    const sessionCard = document.getElementById('todaySessionCard');

    if (activeProgram) {
      const program = getProgramById(activeProgram.programId);
      if (program) {
        programCard.classList.remove('hidden');
        document.getElementById('currentProgramName').textContent = program.name;
        document.getElementById('currentProgramProgress').textContent = 
          `Week ${activeProgram.currentWeek} of ${program.schedule.length}`;
        
        const progress = (activeProgram.currentWeek / program.schedule.length) * 100;
        document.getElementById('programProgressBar').style.width = `${progress}%`;

        const week = program.schedule[activeProgram.currentWeek - 1];
        if (week && week.days.length > 0) {
          const todayWorkout = week.days[0];
          document.getElementById('sessionTitle').textContent = `Day ${todayWorkout.day}`;
          document.getElementById('sessionDetails').textContent = todayWorkout.workout;
        }
      }
    } else {
      programCard.classList.add('hidden');
      document.getElementById('sessionTitle').textContent = 'No workout scheduled';
      document.getElementById('sessionDetails').textContent = 'Start a program or quick workout';
    }
  },

  startTodaySession() {
    const activeProgram = Storage.getActiveProgram();
    if (activeProgram) {
      const program = getProgramById(activeProgram.programId);
      if (program) {
        const week = program.schedule[activeProgram.currentWeek - 1];
        if (week && week.days.length > 0) {
          this.startWorkout({
            name: `${program.name} - Week ${activeProgram.currentWeek}`,
            type: program.category,
            description: week.days[0].workout
          });
        }
      }
    } else {
      this.navigateTo('programs');
      this.showToast('Select a program or quick workout');
    }
  },

  startQuickWorkout(type) {
    const workout = QUICK_WORKOUTS[type];
    if (workout) {
      this.startWorkout({
        ...workout,
        exercises: workout.exercises.map(ex => {
          if (ex.exerciseId) {
            const exercise = getExerciseById(ex.exerciseId);
            return { ...ex, name: exercise ? exercise.name : ex.exerciseId };
          }
          return ex;
        })
      });
    }
  },

  // Programs
  renderPrograms(category = 'all') {
    const programs = filterPrograms(category);
    const container = document.getElementById('programsList');
    const activeProgram = Storage.getActiveProgram();

    container.innerHTML = programs.map(program => `
      <div class="program-card-item ${activeProgram?.programId === program.id ? 'active-program' : ''}" 
           data-program-id="${program.id}">
        <div class="program-card-header">
          <div class="program-icon ${program.category}">
            ${this.getProgramIcon(program.category)}
          </div>
          <div class="program-card-info">
            <h3 class="program-card-name">${program.name}</h3>
            <div class="program-card-meta">
              <span>${program.duration}</span>
              <span>${program.frequency}</span>
            </div>
          </div>
        </div>
        <p class="program-card-description">${program.description}</p>
      </div>
    `).join('');

    container.querySelectorAll('.program-card-item').forEach(card => {
      card.addEventListener('click', () => {
        this.openProgramDetail(card.dataset.programId);
      });
    });
  },

  getProgramIcon(category) {
    const icons = {
      running: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14"/><circle cx="9" cy="9" r="2"/></svg>',
      trail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3L4 7l4 4"/><path d="M4 7h10"/><path d="M16 21l4-4-4-4"/><path d="M20 17H10"/></svg>',
      weights: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><rect x="2" y="4" width="4" height="6" rx="1"/><rect x="18" y="4" width="4" height="6" rx="1"/><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="18" y="14" width="4" height="6" rx="1"/></svg>',
      mobility: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="2"/><path d="M12 7v6"/><path d="M9 21l3-8 3 8"/><path d="M6 11l6 2 6-2"/></svg>'
    };
    return icons[category] || icons.running;
  },

  openProgramDetail(programId) {
    const program = getProgramById(programId);
    if (!program) return;

    this.selectedProgramId = programId;

    document.getElementById('programDetailName').textContent = program.name;
    document.getElementById('programDetailDescription').textContent = program.description;
    document.getElementById('programDetailDuration').innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      ${program.duration}
    `;
    document.getElementById('programDetailFrequency').innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      ${program.frequency}
    `;

    const activeProgram = Storage.getActiveProgram();
    const isActive = activeProgram?.programId === programId;
    const startBtn = document.getElementById('startProgramBtn');
    startBtn.textContent = isActive ? 'Continue Program' : 'Start Program';

    const scheduleHtml = program.schedule.slice(0, 4).map((week, idx) => `
      <div class="week-card">
        <div class="week-header">
          <span>Week ${week.week}</span>
          ${isActive && activeProgram.currentWeek > week.week ? '<span class="completed-badge">Completed</span>' : ''}
        </div>
        <div class="week-days">
          ${week.days.map(day => `
            <div class="day-item">
              <span class="day-name">Day ${day.day}</span>
              <span class="day-workout">${day.workout}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    document.getElementById('programDetailSchedule').innerHTML = scheduleHtml;
    document.getElementById('programDetailModal').classList.remove('hidden');
  },

  startProgram() {
    if (this.selectedProgramId) {
      const activeProgram = Storage.getActiveProgram();
      
      if (activeProgram?.programId !== this.selectedProgramId) {
        Storage.setActiveProgram(this.selectedProgramId);
        this.showToast('Program started!', 'success');
      }

      this.closeModal('programDetailModal');
      this.renderTodayScreen();
      this.renderPrograms();
      this.navigateTo('today');
    }
  },

  // Exercises
  renderExercises(filter = 'all', search = '') {
    const exercises = filterExercises(filter, search);
    const container = document.getElementById('exercisesList');

    if (exercises.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <p>No exercises found</p>
        </div>
      `;
      return;
    }

    container.innerHTML = exercises.map(exercise => `
      <div class="exercise-card" data-exercise-id="${exercise.id}">
        <div class="exercise-card-image">
          ${exercise.image 
            ? `<img src="${exercise.image}" alt="${exercise.name}">`
            : this.getExercisePlaceholder(exercise.category)
          }
        </div>
        <h4 class="exercise-card-name">${exercise.name}</h4>
        <p class="exercise-card-muscle">${exercise.muscles.join(', ')}</p>
      </div>
    `).join('');

    container.querySelectorAll('.exercise-card').forEach(card => {
      card.addEventListener('click', () => {
        this.openExerciseDetail(card.dataset.exerciseId);
      });
    });
  },

  getExercisePlaceholder(category) {
    const icons = {
      upper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 6.5h11M6.5 17.5h11"/><rect x="2" y="4" width="4" height="6" rx="1"/><rect x="18" y="4" width="4" height="6" rx="1"/><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="18" y="14" width="4" height="6" rx="1"/></svg>',
      lower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 21l4-10 4 10"/></svg>',
      core: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>',
      cardio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      stretch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="2"/><path d="M12 7v6"/><path d="M9 21l3-8 3 8"/><path d="M6 11l6 2 6-2"/></svg>'
    };
    return icons[category] || icons.upper;
  },

  openExerciseDetail(exerciseId) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    document.getElementById('exerciseDetailName').textContent = exercise.name;
    document.getElementById('exerciseDetailCategory').textContent = exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1);
    document.getElementById('exerciseDetailMuscles').textContent = exercise.muscles.join(', ');

    const imageContainer = document.getElementById('exerciseDetailImage');
    if (exercise.image) {
      imageContainer.innerHTML = `<img src="${exercise.image}" alt="${exercise.name}">`;
    } else {
      imageContainer.innerHTML = this.getExercisePlaceholder(exercise.category);
    }

    document.getElementById('exerciseDetailSteps').innerHTML = 
      exercise.steps.map(step => `<li>${step}</li>`).join('');
    
    document.getElementById('exerciseDetailCues').innerHTML = 
      exercise.cues.map(cue => `<li>${cue}</li>`).join('');
    
    document.getElementById('exerciseDetailMistakes').innerHTML = 
      exercise.mistakes.map(mistake => `<li>${mistake}</li>`).join('');

    const videoContainer = document.getElementById('exerciseVideoLink');
    if (videoContainer) {
      if (exercise.video) {
        videoContainer.innerHTML = `
          <a href="${exercise.video}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-full video-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch How-to Video
          </a>
        `;
        videoContainer.classList.remove('hidden');
      } else {
        videoContainer.classList.add('hidden');
      }
    }

    document.getElementById('exerciseDetailModal').classList.remove('hidden');
  },

  // Progress
  renderProgress() {
    const streakData = Storage.getStreakData();
    document.getElementById('currentStreak').textContent = streakData.currentStreak;

    const history = Storage.getWorkoutHistory().slice(0, 10);
    const container = document.getElementById('historyList');

    if (history.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3v18h18"/>
            <path d="M18 17l-5-5-4 4-3-3"/>
          </svg>
          <p>No workouts yet. Start your first workout!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = history.map(workout => {
      const date = new Date(workout.date);
      const dateStr = date.toLocaleDateString('en-ZA', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      const timeStr = date.toLocaleTimeString('en-ZA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      return `
        <div class="history-item">
          <div class="history-icon ${workout.type || 'weights'}">
            ${this.getProgramIcon(workout.type || 'weights')}
          </div>
          <div class="history-info">
            <div class="history-name">${workout.name}</div>
            <div class="history-meta">
              ${workout.duration ? `${Math.round(workout.duration / 60)} min` : ''}
              ${workout.distance ? ` • ${workout.distance} km` : ''}
              ${workout.sets ? ` • ${workout.sets.length} sets` : ''}
            </div>
          </div>
          <div class="history-date">
            <div>${dateStr}</div>
            <div>${timeStr}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderCharts() {
    this.renderVolumeChart();
    this.renderDistanceChart();
  },

  renderVolumeChart() {
    const canvas = document.getElementById('volumeChart');
    const ctx = canvas.getContext('2d');
    const data = Storage.getVolumeChartData();
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const maxValue = Math.max(...data.map(d => d.value), 100);
    const barWidth = chartWidth / data.length - 10;

    ctx.clearRect(0, 0, width, height);
    
    const isDark = !document.body.classList.contains('light-mode');
    ctx.fillStyle = isDark ? '#71717a' : '#94a3b8';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'center';

    data.forEach((point, i) => {
      const x = padding + (i * (chartWidth / data.length)) + barWidth / 2;
      const barHeight = (point.value / maxValue) * chartHeight;
      const y = height - padding - barHeight;

      const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
      gradient.addColorStop(0, '#6366f1');
      gradient.addColorStop(1, '#4f46e5');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x - barWidth / 2 + 5, y, barWidth, barHeight, 4);
      ctx.fill();

      ctx.fillStyle = isDark ? '#71717a' : '#94a3b8';
      ctx.fillText(point.label, x + 5, height - 15);
    });
  },

  renderDistanceChart() {
    const canvas = document.getElementById('distanceChart');
    const ctx = canvas.getContext('2d');
    const data = Storage.getDistanceChartData();
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const maxValue = Math.max(...data.map(d => d.value), 10);

    ctx.clearRect(0, 0, width, height);
    
    const isDark = !document.body.classList.contains('light-mode');

    ctx.strokeStyle = isDark ? '#27272a' : '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * chartHeight / 4);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    data.forEach((point, i) => {
      const x = padding + (i * (chartWidth / (data.length - 1)));
      const y = height - padding - (point.value / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    data.forEach((point, i) => {
      const x = padding + (i * (chartWidth / (data.length - 1)));
      const y = height - padding - (point.value / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.fillStyle = '#10b981';
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = isDark ? '#0a0a0f' : '#ffffff';
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isDark ? '#71717a' : '#94a3b8';
      ctx.font = '10px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(point.label, x, height - 15);
    });
  },

  // Workout Player
  startWorkout(workout) {
    this.currentWorkout = workout;
    this.currentExerciseIndex = 0;
    this.currentSet = 1;
    this.workoutSets = [];
    this.workoutStartTime = Date.now();

    document.getElementById('playerWorkoutName').textContent = workout.name;
    
    if (workout.exercises && workout.exercises.length > 0) {
      document.getElementById('playerTotalExercises').textContent = workout.exercises.length;
      this.renderCurrentExercise();
    } else {
      document.getElementById('exerciseName').textContent = workout.description || workout.name;
      document.getElementById('exerciseInstruction').textContent = 'Follow the workout as described';
      document.getElementById('setTracker').classList.add('hidden');
    }

    document.getElementById('workoutPlayer').classList.remove('hidden');
    this.updatePlayerProgress();
  },

  renderCurrentExercise() {
    const exercise = this.currentWorkout.exercises[this.currentExerciseIndex];
    if (!exercise) return;

    document.getElementById('playerCurrentExercise').textContent = this.currentExerciseIndex + 1;
    document.getElementById('exerciseName').textContent = exercise.name;
    
    const exerciseDisplay = document.getElementById('exerciseDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    const setTracker = document.getElementById('setTracker');

    if (exercise.type === 'timer' || exercise.duration) {
      exerciseDisplay.classList.add('hidden');
      timerDisplay.classList.remove('hidden');
      setTracker.classList.add('hidden');
      
      document.getElementById('timerLabel').textContent = exercise.notes || exercise.name;
      this.startTimer(exercise.duration);
    } else {
      exerciseDisplay.classList.remove('hidden');
      timerDisplay.classList.add('hidden');
      setTracker.classList.remove('hidden');

      const exerciseData = exercise.exerciseId ? getExerciseById(exercise.exerciseId) : null;
      document.getElementById('exerciseInstruction').textContent = 
        exerciseData ? exerciseData.steps[0] : (exercise.notes || `${exercise.sets} x ${exercise.reps}`);

      document.getElementById('setCurrentDisplay').textContent = this.currentSet;
      document.getElementById('setTotalDisplay').textContent = exercise.sets || 3;
      document.getElementById('repsInput').value = exercise.reps || 10;
      document.getElementById('weightInput').value = 0;
    }

    this.updatePlayerProgress();
  },

  updatePlayerProgress() {
    if (!this.currentWorkout.exercises) return;
    const progress = ((this.currentExerciseIndex + 1) / this.currentWorkout.exercises.length) * 100;
    document.getElementById('playerProgressFill').style.width = `${progress}%`;
  },

  startTimer(seconds) {
    this.stopTimer();
    this.timerRemaining = seconds;
    this.timerTotal = seconds;
    this.updateTimerDisplay();

    this.timer = setInterval(() => {
      this.timerRemaining--;
      this.updateTimerDisplay();

      if (this.timerRemaining <= 0) {
        this.stopTimer();
        this.playTimerSound();
        this.showToast('Time!', 'success');
      }
    }, 1000);
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  updateTimerDisplay() {
    const mins = Math.floor(this.timerRemaining / 60);
    const secs = this.timerRemaining % 60;
    document.getElementById('timerText').textContent = 
      `${mins}:${secs.toString().padStart(2, '0')}`;

    const progress = (this.timerRemaining / this.timerTotal) * 283;
    document.getElementById('timerCircle').style.strokeDashoffset = 283 - progress;
  },

  playTimerSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio not supported');
    }
  },

  prevExercise() {
    if (this.currentExerciseIndex > 0) {
      this.stopTimer();
      this.currentExerciseIndex--;
      this.currentSet = 1;
      this.renderCurrentExercise();
    }
  },

  nextExercise() {
    const exercise = this.currentWorkout.exercises?.[this.currentExerciseIndex];
    
    if (exercise && exercise.sets && this.currentSet < exercise.sets) {
      this.workoutSets.push({
        exerciseId: exercise.exerciseId || exercise.name,
        set: this.currentSet,
        reps: parseInt(document.getElementById('repsInput').value) || 0,
        weight: parseFloat(document.getElementById('weightInput').value) || 0
      });
      
      this.currentSet++;
      document.getElementById('setCurrentDisplay').textContent = this.currentSet;
      
      if (exercise.rest) {
        document.getElementById('timerLabel').textContent = 'Rest';
        document.getElementById('exerciseDisplay').classList.add('hidden');
        document.getElementById('timerDisplay').classList.remove('hidden');
        document.getElementById('setTracker').classList.add('hidden');
        this.startTimer(exercise.rest);
      }
      return;
    }

    this.stopTimer();

    if (this.currentWorkout.exercises && this.currentExerciseIndex < this.currentWorkout.exercises.length - 1) {
      this.currentExerciseIndex++;
      this.currentSet = 1;
      this.renderCurrentExercise();
    } else {
      this.finishWorkout();
    }
  },

  finishWorkout() {
    this.stopTimer();
    
    const duration = Math.round((Date.now() - this.workoutStartTime) / 1000);
    
    const workoutEntry = {
      name: this.currentWorkout.name,
      type: this.currentWorkout.type,
      duration: duration,
      sets: this.workoutSets,
      distance: this.currentWorkout.type === 'cardio' ? (duration / 60 / 6) : null
    };

    Storage.addWorkoutToHistory(workoutEntry);

    const activeProgram = Storage.getActiveProgram();
    if (activeProgram) {
      const program = getProgramById(activeProgram.programId);
      if (program) {
        const week = program.schedule[activeProgram.currentWeek - 1];
        if (week && week.days.length > 1) {
          Storage.updateProgramProgress(activeProgram.currentWeek, activeProgram.currentDay + 1);
        } else if (activeProgram.currentWeek < program.schedule.length) {
          Storage.updateProgramProgress(activeProgram.currentWeek + 1, 1);
        }
      }
    }

    this.closeModal('workoutPlayer');
    this.showToast('Workout complete! 💪', 'success');
    this.renderTodayScreen();
    this.renderProgress();
    this.currentWorkout = null;
  },

  closeWorkoutPlayer() {
    if (this.currentWorkout) {
      if (confirm('Are you sure you want to end this workout?')) {
        this.stopTimer();
        this.closeModal('workoutPlayer');
        this.currentWorkout = null;
      }
    } else {
      this.closeModal('workoutPlayer');
    }
  },

  // Toast Notifications
  showToast(message, type = 'default') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
