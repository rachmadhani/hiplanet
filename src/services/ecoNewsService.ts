import api from './api'

export interface EcoNewsBlog {
  id: number
  title: string
  author: string
  description: string
  category: string
  image: string | null
  date_created: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedEcoNewsBlogs {
  success: boolean
  data: EcoNewsBlog[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export interface GetEcoNewsParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: string
  sortOrder?: string
}

export const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return '/econews/ocean_conservation.png'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath
  }
  const baseUrl = (import.meta.env.VITE_API_URL || 
    (import.meta.env.DEV 
      ? 'http://localhost:3000/api' 
      : 'https://antiquewhite-guanaco-250612.hostingersite.com/api/'))
  const origin = baseUrl.replace(/\/api\/?$/, '')
  return `${origin}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
}

export const ecoNewsService = {
  async getAll(params?: GetEcoNewsParams): Promise<PaginatedEcoNewsBlogs> {
    const response = await api.get<PaginatedEcoNewsBlogs>('/econews-blogs', {
      params
    })
    return response.data
  },

  async getById(id: number): Promise<{ success: boolean; data: EcoNewsBlog }> {
    const response = await api.get<{ success: boolean; data: EcoNewsBlog }>(`/econews-blogs/${id}`)
    return response.data
  },

  async create(formData: FormData): Promise<{ success: boolean; message: string; data: EcoNewsBlog }> {
    const response = await api.post<{ success: boolean; message: string; data: EcoNewsBlog }>('/econews-blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async update(id: number, formData: FormData): Promise<{ success: boolean; message: string; data: EcoNewsBlog }> {
    const response = await api.put<{ success: boolean; message: string; data: EcoNewsBlog }>(`/econews-blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/econews-blogs/${id}`)
    return response.data
  }
}
