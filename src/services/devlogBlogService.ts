import api from './api'

export interface DevlogBlog {
  id: number
  title: string
  author: string
  description: string
  category_id: number
  slug: string
  image: string | null
  date_created: string
  createdAt: string
  updatedAt: string
  category?: {
    id: number
    name: string
    slug: string
  }
}

export interface GetDevlogBlogsParams {
  page?: number
  limit?: number
  category_id?: number
  search?: string
  sortBy?: string
  sortOrder?: string
}

export const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return '/images/default-thumbnail.png'
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

export const devlogBlogService = {
  async getAll(params?: GetDevlogBlogsParams): Promise<{ success: boolean; data: DevlogBlog[]; pagination?: any }> {
    const response = await api.get<{ success: boolean; data: DevlogBlog[]; pagination?: any }>('/devlog-blogs', { params })
    return response.data
  },

  async getById(id: number): Promise<{ success: boolean; data: DevlogBlog }> {
    const response = await api.get<{ success: boolean; data: DevlogBlog }>(`/devlog-blogs/${id}`)
    return response.data
  },

  async getBySlug(slug: string): Promise<{ success: boolean; data: DevlogBlog }> {
    const response = await api.get<{ success: boolean; data: DevlogBlog }>(`/devlog-blogs/slug/${slug}`)
    return response.data
  },

  async create(formData: FormData): Promise<{ success: boolean; message: string; data: DevlogBlog }> {
    const response = await api.post<{ success: boolean; message: string; data: DevlogBlog }>('/devlog-blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async update(id: number, formData: FormData): Promise<{ success: boolean; message: string; data: DevlogBlog }> {
    const response = await api.put<{ success: boolean; message: string; data: DevlogBlog }>(`/devlog-blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/devlog-blogs/${id}`)
    return response.data
  }
}
