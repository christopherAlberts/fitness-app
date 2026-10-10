// Local Storage Management
const STORAGE_KEYS = {
  ACTIVE_PROGRAM: 'fitflow_active_program',
  PROGRAM_PROGRESS: 'fitflow_program_progress',
  WORKOUT_HISTORY: 'fitflow_workout_history',
  USER_SETTINGS: 'fitflow_user_settings',
  STREAK_DATA: 'fitflow_streak_data'
};

const Storage = {
  // Generic get/set
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },

  // Active Program
  getActiveProgram() {
    return this.get(STORAGE_KEYS.ACTIVE_PROGRAM);
  },

  setActiveProgram(programId, startDate = new Date().toISOString()) {
    return this.set(STORAGE_KEYS.ACTIVE_PROGRAM, {
      programId,
      startDate,
      currentWeek: 1,
      currentDay: 1
    });
  },

  clearActiveProgram() {
    return this.remove(STORAGE_KEYS.ACTIVE_PROGRAM);
  },

  updateProgramProgress(week, day) {
    const active = this.getActiveProgram();
    if (active) {
      active.currentWeek = week;
      active.currentDay = day;
      return this.set(STORAGE_KEYS.ACTIVE_PROGRAM, active);
    }
    return false;
  },

  // Workout History
  getWorkoutHistory() {
    return this.get(STORAGE_KEYS.WORKOUT_HISTORY) || [];
  },

  addWorkoutToHistory(workout) {
    const history = this.getWorkoutHistory();
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...workout
    };
    history.unshift(entry);
    if (history.length > 500) {
      history.pop();
    }
    this.set(STORAGE_KEYS.WORKOUT_HISTORY, history);
    this.updateStreak();
    return entry;
  },

  getWorkoutsThisWeek() {
    const history = this.getWorkoutHistory();
    const weekStart = this.getWeekStart(new Date());
    return history.filter(w => new Date(w.date) >= weekStart);
  },

  getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  },

  // Streak Management
  getStreakData() {
    return this.get(STORAGE_KEYS.STREAK_DATA) || {
      currentStreak: 0,
      longestStreak: 0,
      lastWorkoutDate: null
    };
  },

  updateStreak() {
    const streakData = this.getStreakData();
    const today = new Date().toDateString();
    const lastDate = streakData.lastWorkoutDate 
      ? new Date(streakData.lastWorkoutDate).toDateString() 
      : null;

    if (lastDate === today) {
      return streakData;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate === yesterdayStr) {
      streakData.currentStreak += 1;
    } else if (lastDate !== today) {
      streakData.currentStreak = 1;
    }

    if (streakData.currentStreak > streakData.longestStreak) {
      streakData.longestStreak = streakData.currentStreak;
    }

    streakData.lastWorkoutDate = new Date().toISOString();
    this.set(STORAGE_KEYS.STREAK_DATA, streakData);
    return streakData;
  },

  // User Settings
  getSettings() {
    return this.get(STORAGE_KEYS.USER_SETTINGS) || {
      darkMode: true,
      units: 'metric'
    };
  },

  updateSettings(settings) {
    const current = this.getSettings();
    return this.set(STORAGE_KEYS.USER_SETTINGS, { ...current, ...settings });
  },

  // Stats Calculation
  getWeeklyStats() {
    const weekWorkouts = this.getWorkoutsThisWeek();
    
    let totalDistance = 0;
    let workoutCount = weekWorkouts.length;

    weekWorkouts.forEach(w => {
      if (w.distance) {
        totalDistance += w.distance;
      }
    });

    const streakData = this.getStreakData();

    return {
      workouts: workoutCount,
      distance: Math.round(totalDistance * 10) / 10,
      streak: streakData.currentStreak
    };
  },

  // Chart Data
  getVolumeChartData() {
    const history = this.getWorkoutHistory();
    const weeks = [];
    const now = new Date();

    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekWorkouts = history.filter(w => {
        const date = new Date(w.date);
        return date >= weekStart && date < weekEnd;
      });

      let volume = 0;
      weekWorkouts.forEach(w => {
        if (w.sets) {
          w.sets.forEach(s => {
            volume += (s.reps || 0) * (s.weight || 0);
          });
        }
      });

      weeks.push({
        label: `W${8 - i}`,
        value: Math.round(volume)
      });
    }

    return weeks;
  },

  getDistanceChartData() {
    const history = this.getWorkoutHistory();
    const weeks = [];
    const now = new Date();

    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekWorkouts = history.filter(w => {
        const date = new Date(w.date);
        return date >= weekStart && date < weekEnd;
      });

      let distance = 0;
      weekWorkouts.forEach(w => {
        if (w.distance) {
          distance += w.distance;
        }
      });

      weeks.push({
        label: `W${8 - i}`,
        value: Math.round(distance * 10) / 10
      });
    }

    return weeks;
  },

  // Export/Import
  exportData() {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      activeProgram: this.getActiveProgram(),
      workoutHistory: this.getWorkoutHistory(),
      streakData: this.getStreakData(),
      settings: this.getSettings()
    };
    return JSON.stringify(data, null, 2);
  },

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.version) {
        if (data.activeProgram) this.set(STORAGE_KEYS.ACTIVE_PROGRAM, data.activeProgram);
        if (data.workoutHistory) this.set(STORAGE_KEYS.WORKOUT_HISTORY, data.workoutHistory);
        if (data.streakData) this.set(STORAGE_KEYS.STREAK_DATA, data.streakData);
        if (data.settings) this.set(STORAGE_KEYS.USER_SETTINGS, data.settings);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  },

  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.remove(key);
    });
  }
};
