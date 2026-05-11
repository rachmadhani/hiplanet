<script setup lang="ts">
import { useAppStore } from '../stores'
const store = useAppStore()
</script>

<template>
  <div class="dashboard animate-fade">
    <header class="dashboard-header">
      <div class="welcome">
        <h1>Welcome back, <span class="text-gradient">{{ store.user.name }}</span></h1>
        <p>Here's what's happening with your ecosystem today.</p>
      </div>
      <div class="stats glass">
        <div class="stat-item">
          <span class="label">Status</span>
          <span class="value">{{ store.user.status }}</span>
        </div>
        <div class="stat-item">
          <span class="label">Notifications</span>
          <span class="value">{{ store.notifications }}</span>
        </div>
      </div>
    </header>

    <div class="grid">
      <div class="card glass main-chart">
        <h3>Performance Overview</h3>
        <div class="chart-placeholder">
          <div class="bar" style="height: 40%"></div>
          <div class="bar" style="height: 70%"></div>
          <div class="bar" style="height: 55%"></div>
          <div class="bar" style="height: 90%"></div>
          <div class="bar" style="height: 65%"></div>
          <div class="bar" style="height: 80%"></div>
        </div>
      </div>
      
      <div class="card glass side-panel">
        <h3>Quick Actions</h3>
        <div class="actions-list">
          <button @click="store.incrementNotifications()" class="action-btn">
            Send Test Alert
          </button>
          <button class="action-btn">Generate Report</button>
          <button class="action-btn">Update Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.welcome h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.stats {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 2.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.value {
  font-size: 1.2rem;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.card {
  padding: 2rem;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding-top: 2rem;
}

.bar {
  flex: 1;
  background: linear-gradient(to top, var(--primary), var(--secondary));
  border-radius: 8px 8px 0 0;
  transition: height 1s ease;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  padding: 1rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-main);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: var(--primary);
  border-color: var(--primary);
  transform: translateX(10px);
}
</style>
