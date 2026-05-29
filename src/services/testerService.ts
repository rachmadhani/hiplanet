import api from './api'

export interface TesterApplication {
  id: number
  email: string
  name: string
  platform: 'Windows' | 'macOS' | 'Both'
  why: string
  country: string | null
  nda: boolean
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface PaginatedTesterApplications {
  success: boolean
  data: TesterApplication[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export const testerService = {
  async submit(data: {
    email: string
    name: string
    platform: string
    why: string
    country?: string
    nda: boolean
  }): Promise<{ success: boolean; data: TesterApplication }> {
    const response = await api.post<{ success: boolean; data: TesterApplication }>('/tester-applications', data)
    return response.data
  },

  async getAll(page = 1, limit = 10): Promise<PaginatedTesterApplications> {
    const response = await api.get<PaginatedTesterApplications>('/tester-applications', {
      params: { page, limit }
    })
    return response.data
  },

  async update(id: number, data: Partial<TesterApplication>): Promise<{ success: boolean; data: TesterApplication }> {
    const response = await api.put<{ success: boolean; data: TesterApplication }>(`/tester-applications/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/tester-applications/${id}`)
    return response.data
  }
}
