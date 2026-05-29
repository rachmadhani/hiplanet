import api from './api'
import type { Admin } from '@/stores/auth'

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: Admin
    token: string
  }
}

export const authService = {
  async register(credentials: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials)
    return response.data
  },

  async login(credentials: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async me(): Promise<Admin> {
    const response = await api.get<Admin>('/auth/me')
    return response.data
  },

  async logout() {
    // In many JWT setups, we just clear the token client-side, but if there's a backend endpoint we call it.
    try {
      await api.post('/auth/logout')
    } catch (e) {
      console.warn('Backend logout failed or not implemented', e)
    }
  }
}
