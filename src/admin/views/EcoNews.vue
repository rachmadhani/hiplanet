<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    
    <div class="space-y-6">
      <!-- Search, Filter & Toolbar -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <!-- Search and Category Filters -->
        <div class="flex flex-wrap items-center gap-3 flex-1 max-w-2xl">
          <!-- Search Input -->
          <div class="relative flex-1 min-w-[200px] max-w-md">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @input="onSearchInput"
              type="text"
              placeholder="Search by title, description or author..."
              class="w-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
          
          <!-- Category Filter -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Category:</label>
            <select
              v-model="categoryFilter"
              @change="fetchBlogs"
              class="px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="all">All Categories</option>
              <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <!-- Add EcoNews Button -->
        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 shadow-theme-xs transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add EcoNews
        </button>
      </div>

      <!-- Data Table Card -->
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Image</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Title</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Author</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Category</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Created Date</p>
                </th>
                <th class="px-5 py-3 text-right sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="isLoading" class="border-t border-gray-100 dark:border-gray-800">
                <td colspan="6" class="px-5 py-10 text-center sm:px-6">
                  <div class="flex flex-col items-center justify-center space-y-2">
                    <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Loading blog posts...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="blogs.length === 0" class="border-t border-gray-100 dark:border-gray-800">
                <td colspan="6" class="px-5 py-10 text-center sm:px-6">
                  <span class="text-sm text-gray-500 dark:text-gray-400">No blog posts found.</span>
                </td>
              </tr>
              <tr
                v-for="blog in blogs"
                :key="blog.id"
                class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/[0.01]"
              >
                <!-- Image -->
                <td class="px-5 py-4 sm:px-6">
                  <div class="w-16 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <img
                      :src="getImageUrl(blog.image)"
                      alt="Cover"
                      class="w-full h-full object-cover"
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
                    {{ blog.category }}
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
                      @click="confirmDelete(blog)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-red-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400 cursor-pointer"
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
        </div>

        <!-- Pagination Controls -->
        <div v-if="!isLoading && pagination.totalPages > 1" class="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-5 py-4 dark:border-gray-800 sm:flex-row sm:px-6">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Showing Page <span class="font-medium text-gray-800 dark:text-white">{{ pagination.currentPage }}</span> of <span class="font-medium text-gray-800 dark:text-white">{{ pagination.totalPages }}</span> (Total {{ pagination.totalItems }} articles)
          </p>
          <div class="flex items-center gap-2">
            <button
              @click="changePage(pagination.currentPage - 1)"
              :disabled="pagination.currentPage === 1"
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
            >
              Previous
            </button>
            <button
              v-for="p in pageNumbers"
              :key="p"
              @click="changePage(p)"
              :class="[
                'inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-lg cursor-pointer',
                p === pagination.currentPage
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
              ]"
            >
              {{ p }}
            </button>
            <button
              @click="changePage(pagination.currentPage + 1)"
              :disabled="pagination.currentPage === pagination.totalPages"
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-4xl bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 max-h-[90vh] flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            {{ isEditMode ? 'Edit EcoNews Post' : 'Add New EcoNews Post' }}
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
                placeholder="Planting Trees for the Future"
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
              <input
                v-model="form.category"
                type="text"
                required
                placeholder="Nature"
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
            </div>
          </div>

          <!-- Cover Image Upload -->
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">
              Cover Image <span v-if="!isEditMode" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <!-- Image Preview -->
              <div class="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
                <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>

              <!-- Input -->
              <div class="flex-1 w-full">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  @change="onImageSelected"
                  class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-gray-800 dark:file:text-white cursor-pointer"
                  :required="!isEditMode"
                />
                <span class="block mt-1 text-xs text-gray-500 dark:text-gray-400">Supported formats: JPEG, PNG, GIF, WEBP (Max 5MB)</span>
              </div>
            </div>
          </div>

          <!-- Description (TipTap Rich Text Editor) -->
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Description <span class="text-red-500">*</span></label>
            <TipTapEditor v-model="form.description" />
          </div>

          <!-- Footer Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 shadow-theme-xs cursor-pointer"
            >
              {{ isSaving ? 'Saving...' : 'Save Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
        <div class="flex items-center gap-3 mb-4 text-red-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h4 class="text-lg font-semibold dark:text-white/90">Delete Blog Post</h4>
        </div>
        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete the blog post <span class="font-semibold text-gray-700 dark:text-white">"{{ activeBlog?.title }}"</span>? This action will permanently remove the article and its image from the server.
        </p>

        <div class="flex items-center justify-end gap-3">
          <button
            type="button"
            @click="closeDeleteModal"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="deletePost"
            :disabled="isDeleting"
            class="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-theme-xs cursor-pointer"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { ecoNewsService, getImageUrl, type EcoNewsBlog } from '@/services/ecoNewsService'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import TipTapEditor from '@admin/components/forms/FormElements/TipTapEditor.vue'

const currentPageTitle = ref('EcoNews Management')
const blogs = ref<EcoNewsBlog[]>([])
const uniqueCategories = ref<string[]>([])
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
const activeBlog = ref<EcoNewsBlog | null>(null)

// Form State
interface FormState {
  title: string
  author: string
  category: string
  description: string
  date_created: string
}

const form = ref<FormState>({
  title: '',
  author: '',
  category: '',
  description: '',
  date_created: ''
})

const selectedFile = ref<File | null>(null)
const imagePreview = ref<string>('')

// Fetch Blog Posts
const fetchBlogs = async () => {
  isLoading.value = true
  try {
    const params: any = {
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
      sortBy: 'date_created',
      sortOrder: 'desc'
    }
    
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }
    
    if (categoryFilter.value !== 'all') {
      params.category = categoryFilter.value
    }
    
    const response = await ecoNewsService.getAll(params)
    blogs.value = response.data
    
    pagination.value = {
      totalItems: response.pagination.totalItems,
      totalPages: response.pagination.totalPages,
      currentPage: response.pagination.currentPage,
      limit: response.pagination.limit
    }

    // Refresh list of categories dynamically from all blogs if we are not currently filtering
    if (categoryFilter.value === 'all' && !searchQuery.value) {
      const cats = response.data.map(b => b.category).filter((val, idx, self) => self.indexOf(val) === idx)
      uniqueCategories.value = cats
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to fetch EcoNews blogs.'
    toast.error(msg)
  } finally {
    isLoading.value = false
  }
}

// Debounced search input
const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.currentPage = 1
    fetchBlogs()
  }, 300)
}

// Pagination navigation
const changePage = (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return
  pagination.value.currentPage = page
  fetchBlogs()
}

// Compute page number buttons
const pageNumbers = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= pagination.value.totalPages; i++) {
    pages.push(i)
  }
  return pages
})

// Format ISO string to datetime-local expected format: YYYY-MM-DDTHH:mm
const formatToDateTimeLocal = (dateStr?: string | null) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// Modals Open/Close
const openCreateModal = () => {
  isEditMode.value = false
  activeBlog.value = null
  selectedFile.value = null
  imagePreview.value = ''
  
  form.value = {
    title: '',
    author: '',
    category: '',
    description: '',
    date_created: formatToDateTimeLocal(new Date().toISOString())
  }
  
  showModal.value = true
}

const openEditModal = (blog: EcoNewsBlog) => {
  isEditMode.value = true
  activeBlog.value = blog
  selectedFile.value = null
  imagePreview.value = getImageUrl(blog.image)
  
  form.value = {
    title: blog.title,
    author: blog.author,
    category: blog.category,
    description: blog.description,
    date_created: formatToDateTimeLocal(blog.date_created || blog.createdAt)
  }
  
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  activeBlog.value = null
  selectedFile.value = null
  imagePreview.value = ''
}

const confirmDelete = (blog: EcoNewsBlog) => {
  activeBlog.value = blog
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  activeBlog.value = null
}

// Handle image selection
const onImageSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

// Format Date string for list
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Create or Edit blog submit handler
const savePost = async () => {
  isSaving.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('author', form.value.author)
    formData.append('category', form.value.category)
    formData.append('description', form.value.description)
    
    if (form.value.date_created) {
      formData.append('date_created', new Date(form.value.date_created).toISOString())
    }
    
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    if (isEditMode.value && activeBlog.value) {
      await ecoNewsService.update(activeBlog.value.id, formData)
      toast.success('Successfully updated EcoNews article.')
    } else {
      await ecoNewsService.create(formData)
      toast.success('Successfully created EcoNews article.')
    }
    
    closeModal()
    fetchBlogs()
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to save EcoNews article.'
    toast.error(msg)
  } finally {
    isSaving.value = false
  }
}

// Delete Blog handler
const deletePost = async () => {
  if (!activeBlog.value) return
  isDeleting.value = true
  try {
    const response = await ecoNewsService.delete(activeBlog.value.id)
    toast.success(response.message || 'Successfully deleted EcoNews article.')
    closeDeleteModal()
    
    if (blogs.value.length === 1 && pagination.value.currentPage > 1) {
      pagination.value.currentPage--
    }
    fetchBlogs()
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to delete EcoNews article.'
    toast.error(msg)
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>
