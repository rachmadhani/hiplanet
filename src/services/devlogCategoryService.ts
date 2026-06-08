import api from './api'

export interface DevlogCategory {
  id: number
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export const devlogCategoryService = {
  async getAll(): Promise<{ success: boolean; data: DevlogCategory[] }> {
    const response = await api.get<{ success: boolean; data: DevlogCategory[] }>('/devlog-categories')
    return response.data
  },

  async getById(id: number): Promise<{ success: boolean; data: DevlogCategory }> {
    const response = await api.get<{ success: boolean; data: DevlogCategory }>(`/devlog-categories/${id}`)
    return response.data
  },

  async create(data: { name: string; slug: string; description?: string }): Promise<{ success: boolean; data: DevlogCategory }> {
    const response = await api.post<{ success: boolean; data: DevlogCategory }>('/devlog-categories', data)
    return response.data
  },

  async update(id: number, data: { name?: string; slug?: string; description?: string }): Promise<{ success: boolean; data: DevlogCategory }> {
    const response = await api.put<{ success: boolean; data: DevlogCategory }>(`/devlog-categories/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/devlog-categories/${id}`)
    return response.data
  }
}
