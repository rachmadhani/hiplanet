import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      name: 'HiPlanet Explorer',
      status: 'Pro'
    },
    notifications: 0
  }),
  actions: {
    incrementNotifications() {
      this.notifications++
    }
  }
})
