<template>
  <AdminLayout>
    <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <!-- Breadcrumb Start -->
      <PageBreadcrumb :pageTitle="currentPageTitle" />
      <!-- Breadcrumb End -->

      <!-- Action Bar -->
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          <!-- Search -->
          <div class="relative w-full sm:w-64">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search posts..."
              class="w-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
            />
          </div>
          
          <!-- Category Filter -->
          <select 
            v-model="categoryFilter"
            @change="fetchBlogs"
            class="w-full sm:w-48 px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
          >
            <option value="all">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Add New Button -->
        <button
          @click="openAddModal"
          class="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 shadow-theme-xs transition-colors w-full sm:w-auto cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Post
        </button>
      </div>

      <!-- Main Content -->
      <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-theme-sm">
        <div class="max-w-full overflow-x-auto">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex items-center justify-center py-20">
            <div class="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <!-- Table -->
          <table v-else-if="blogs.length > 0" class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Image</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap min-w-[200px]">Title</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Author</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Category</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Date Created</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr v-for="blog in blogs" :key="blog.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <!-- Image -->
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex-shrink-0 w-16 h-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img 
                      :src="getImageUrl(blog.image)" 
                      alt="Thumbnail" 
                      class="object-cover w-full h-full"
                      @error="($event.target as HTMLImageElement).src = '/images/default-thumbnail.png'"
                    />
                  </div>
                </td>
                <!-- Title -->
                <td class="px-5 py-4 sm:px-6 max-w-sm truncate" :title="blog.title">
                  <span class="font-semibold text-gray-800 text-theme-sm dark:text-white/90 block truncate">
                    {{ blog.title }}
                  </span>
                </td>
                <!-- Author -->
                <td class="px-5 py-4 sm:px-6">
                  <p class="text-gray-800 text-theme-sm dark:text-white/90">{{ blog.author }}</p>
                </td>
                <!-- Category -->
                <td class="px-5 py-4 sm:px-6">
                  <span class="px-2.5 py-1 text-theme-xs font-medium rounded-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    {{ getCategoryName(blog.category_id) }}
                  </span>
                </td>
                <!-- Created Date -->
                <td class="px-5 py-4 sm:px-6">
                  <p class="text-gray-500 text-theme-xs dark:text-gray-400">{{ formatDate(blog.date_created || blog.createdAt) }}</p>
                </td>
                <!-- Actions -->
                <td class="px-5 py-4 text-right sm:px-6">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openEditModal(blog)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 cursor-pointer"
                      title="Edit Post"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button
                      @click="openDeleteModal(blog)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-500 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 cursor-pointer"
                      title="Delete Post"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center">
            <svg class="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No Posts Found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              {{ searchQuery ? 'Try adjusting your search or filters.' : 'Get started by creating a new devlog post.' }}
            </p>
            <button
              v-if="!searchQuery"
              @click="openAddModal"
              class="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 shadow-theme-xs cursor-pointer transition-colors"
            >
              Add New Post
            </button>
          </div>
        </div>
      </div>
      
      <!-- Pagination Controls -->
      <div v-if="pagination.totalPages > 1" class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Showing <span class="font-medium text-gray-900 dark:text-white">{{ ((pagination.currentPage - 1) * pagination.limit) + 1 }}</span> to <span class="font-medium text-gray-900 dark:text-white">{{ Math.min(pagination.currentPage * pagination.limit, pagination.totalItems) }}</span> of <span class="font-medium text-gray-900 dark:text-white">{{ pagination.totalItems }}</span> results
        </div>
        <div class="flex gap-2">
          <button 
            @click="changePage(pagination.currentPage - 1)" 
            :disabled="pagination.currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
          >
            Previous
          </button>
          <button 
            @click="changePage(pagination.currentPage + 1)" 
            :disabled="pagination.currentPage === pagination.totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-4xl bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 max-h-[90vh] flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            {{ isEditMode ? 'Edit Devlog Post' : 'Add New Devlog Post' }}
          </h4>
          <button
            type="button"
            @click="closeModal"
            class="p-1.5 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors cursor-pointer"
            title="Close"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="savePost" class="space-y-4 overflow-y-auto pr-1 flex-1 custom-scrollbar">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Title -->
            <div class="col-span-2 md:col-span-1">
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Title <span class="text-red-500">*</span></label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="Update #1: New Features"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>

            <!-- Author -->
            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Author <span class="text-red-500">*</span></label>
              <input
                v-model="form.author"
                type="text"
                required
                placeholder="Sean Beck"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>

            <!-- Category -->
            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Category <span class="text-red-500">*</span></label>
              <select
                v-model="form.category_id"
                required
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
                <option value="" disabled>Select a category</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Slug -->
            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">URL Slug <span class="text-red-500">*</span></label>
              <input
                v-model="form.slug"
                type="text"
                required
                placeholder="update-1-new-features"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>

            <!-- Custom Created Date -->
            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Date Created (Optional)</label>
              <input
                v-model="form.date_created"
                type="datetime-local"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Overrides the default publish date.</p>
            </div>

            <!-- Image Upload -->
            <div class="col-span-2 md:col-span-1">
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Cover Image</label>
              
              <div class="flex items-center gap-4">
                <div v-if="imagePreview" class="relative w-20 h-20 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <img :src="imagePreview" alt="Preview" class="object-cover w-full h-full" />
                </div>
                
                <div class="flex-1 relative">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    @change="handleFileUpload"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 dark:hover:file:bg-brand-500/20 cursor-pointer"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, GIF, or WEBP. Max 5MB.</p>
                </div>
              </div>
            </div>
            
            <!-- Description (Rich Text Editor) -->
            <div class="col-span-2">
              <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Description / Content <span class="text-red-500">*</span></label>
              <div class="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden focus-within:ring-3 focus-within:ring-brand-500/10 focus-within:border-brand-300">
                <TipTapEditor v-model="form.description" />
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 shadow-theme-xs cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 shadow-theme-xs cursor-pointer transition-colors"
            >
              <svg v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSaving ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center text-center">
        <div class="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full dark:bg-red-900/30">
          <svg class="w-6 h-6 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Delete Post</h3>
        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <span class="font-bold text-gray-700 dark:text-gray-300">"{{ activeBlog?.title }}"</span>? This action cannot be undone.
        </p>
        
        <div class="flex w-full gap-3">
          <button
            @click="closeDeleteModal"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 shadow-theme-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="deletePost"
            :disabled="isDeleting"
            class="flex-1 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-theme-xs cursor-pointer"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { devlogBlogService, getImageUrl, type DevlogBlog } from '@/services/devlogBlogService'
import { devlogCategoryService, type DevlogCategory } from '@/services/devlogCategoryService'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import TipTapEditor from '@admin/components/forms/FormElements/TipTapEditor.vue'

const currentPageTitle = ref('Devlog Blogs Management')
const blogs = ref<DevlogBlog[]>([])
const categories = ref<DevlogCategory[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)

const searchQuery = ref('')
const categoryFilter = ref('all')
let searchTimeout: any = null

const pagination = ref({
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 10
})

const toast = useToast()

// Modals State
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const activeBlog = ref<DevlogBlog | null>(null)

// Form State
interface FormState {
  title: string
  author: string
  category_id: number | ''
  slug: string
  description: string
  date_created: string
}

const form = ref<FormState>({
  title: '',
  author: '',
  category_id: '',
  slug: '',
  description: '',
  date_created: ''
})

// Auto-generate slug from title
watch(() => form.value.title, (newTitle) => {
  if (!isEditMode.value) {
    form.value.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
})

const selectedFile = ref<File | null>(null)
const imagePreview = ref<string>('')

// Format date for inputs
const formatToDateTimeLocal = (isoString: string) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}

// Fetch Categories
const fetchCategories = async () => {
  try {
    const response = await devlogCategoryService.getAll()
    categories.value = response.data
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const getCategoryName = (id: number) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : 'Unknown'
}

// Fetch Blog Posts
const fetchBlogs = async () => {
  isLoading.value = true
  try {
    const params: any = {
      page: pagination.value.currentPage,
      limit: pagination.value.limit
    }
    
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }
    
    if (categoryFilter.value !== 'all') {
      params.category_id = categoryFilter.value
    }

    const response = await devlogBlogService.getAll(params)
    blogs.value = response.data
    
    if (response.pagination) {
      pagination.value = {
        ...pagination.value,
        totalItems: response.pagination.totalItems,
        totalPages: response.pagination.totalPages,
        currentPage: response.pagination.currentPage
      }
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    toast.error('Failed to load devlog posts')
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.currentPage = 1
    fetchBlogs()
  }, 500)
}

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    fetchBlogs()
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      target.value = ''
      return
    }
    
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

// Modal Actions
const openAddModal = () => {
  isEditMode.value = false
  activeBlog.value = null
  selectedFile.value = null
  imagePreview.value = ''
  
  form.value = {
    title: '',
    author: '',
    category_id: '',
    slug: '',
    description: '',
    date_created: formatToDateTimeLocal(new Date().toISOString())
  }
  
  showModal.value = true
}

const openEditModal = async (blog: DevlogBlog) => {
  isEditMode.value = true
  activeBlog.value = blog
  selectedFile.value = null
  imagePreview.value = blog.image ? getImageUrl(blog.image) : ''
  
  // Pre-fill with list data first (description may be missing from list endpoint)
  form.value = {
    title: blog.title,
    author: blog.author,
    category_id: blog.category_id,
    slug: blog.slug || '',
    description: blog.description || '',
    date_created: formatToDateTimeLocal(blog.date_created || blog.createdAt)
  }
  
  showModal.value = true

  // Fetch full blog data to get description
  try {
    const response = await devlogBlogService.getById(blog.id)
    if (response.data) {
      form.value.description = response.data.description || ''
    }
  } catch (error) {
    console.error('Failed to fetch blog details:', error)
  }
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    activeBlog.value = null
    selectedFile.value = null
    imagePreview.value = ''
  }, 200)
}

const openDeleteModal = (blog: DevlogBlog) => {
  activeBlog.value = blog
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  setTimeout(() => {
    if (!showModal.value) activeBlog.value = null
  }, 200)
}

// Save Blog (Create/Update)
const savePost = async () => {
  if (!form.value.category_id) {
    toast.error('Please select a category')
    return
  }

  isSaving.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('author', form.value.author)
    formData.append('category_id', form.value.category_id.toString())
    formData.append('slug', form.value.slug)
    formData.append('description', form.value.description)
    
    if (form.value.date_created) {
      const utcDate = new Date(form.value.date_created).toISOString()
      formData.append('date_created', utcDate)
    }
    
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    if (isEditMode.value && activeBlog.value) {
      await devlogBlogService.update(activeBlog.value.id, formData)
      toast.success('Post updated successfully')
    } else {
      await devlogBlogService.create(formData)
      toast.success('Post created successfully')
    }
    
    closeModal()
    fetchBlogs()
  } catch (error: any) {
    console.error('Save blog error:', error)
    toast.error(error.response?.data?.message || 'Failed to save post')
  } finally {
    isSaving.value = false
  }
}

// Delete Blog
const deletePost = async () => {
  if (!activeBlog.value) return
  
  isDeleting.value = true
  try {
    await devlogBlogService.delete(activeBlog.value.id)
    toast.success('Post deleted successfully')
    closeDeleteModal()
    
    if (blogs.value.length === 1 && pagination.value.currentPage > 1) {
      pagination.value.currentPage -= 1
    }
    fetchBlogs()
  } catch (error: any) {
    console.error('Delete blog error:', error)
    toast.error(error.response?.data?.message || 'Failed to delete post')
  } finally {
    isDeleting.value = false
  }
}

onMounted(async () => {
  await fetchCategories()
  fetchBlogs()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}
</style>
