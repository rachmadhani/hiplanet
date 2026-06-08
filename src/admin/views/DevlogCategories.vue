<template>
  <AdminLayout>
    <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <!-- Breadcrumb Start -->
      <PageBreadcrumb :pageTitle="currentPageTitle" />
      <!-- Breadcrumb End -->

      <!-- Action Bar -->
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <!-- Add New Button -->
        <button
          @click="openAddModal"
          class="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 shadow-theme-xs transition-colors w-full sm:w-auto cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Category
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
          <table v-else-if="categories.length > 0" class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">ID</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Name</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Slug</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap">Description</th>
                <th class="px-5 py-4 font-medium text-gray-500 dark:text-gray-400 text-theme-sm whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-800 text-theme-sm dark:text-white/90">{{ category.id }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="font-semibold text-gray-800 text-theme-sm dark:text-white/90">{{ category.name }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ category.slug }}</span>
                </td>
                <td class="px-5 py-4 sm:px-6 max-w-sm truncate" :title="category.description || ''">
                  <span class="text-gray-500 text-theme-sm dark:text-gray-400">{{ category.description || '-' }}</span>
                </td>
                <td class="px-5 py-4 text-right sm:px-6">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openEditModal(category)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400 cursor-pointer"
                      title="Edit Category"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button
                      @click="openDeleteModal(category)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-500 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 cursor-pointer"
                      title="Delete Category"
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
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No Categories Found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Get started by creating a new devlog category.</p>
            <button
              @click="openAddModal"
              class="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 shadow-theme-xs cursor-pointer transition-colors"
            >
              Add New Category
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-xl bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            {{ isEditMode ? 'Edit Category' : 'Add New Category' }}
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
        
        <form @submit.prevent="saveCategory" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Name <span class="text-red-500">*</span></label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g., General, Updates, Characters"
              class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <!-- Slug -->
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Slug <span class="text-red-500">*</span></label>
            <input
              v-model="form.slug"
              type="text"
              required
              placeholder="e.g., general"
              class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Optional description"
              class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            ></textarea>
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
              {{ isSaving ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
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
        <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Delete Category</h3>
        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <span class="font-bold text-gray-700 dark:text-gray-300">"{{ activeCategory?.name }}"</span>? This action cannot be undone.
        </p>
        
        <div class="flex w-full gap-3">
          <button
            @click="closeDeleteModal"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 shadow-theme-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="deleteCategory"
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
import { devlogCategoryService, type DevlogCategory } from '@/services/devlogCategoryService'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'

const currentPageTitle = ref('Devlog Categories')
const categories = ref<DevlogCategory[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)

const toast = useToast()

// Modals State
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const activeCategory = ref<DevlogCategory | null>(null)

// Form State
interface FormState {
  name: string
  slug: string
  description: string
}

const form = ref<FormState>({
  name: '',
  slug: '',
  description: ''
})

// Auto-generate slug from name
watch(() => form.value.name, (newName) => {
  if (!isEditMode.value) {
    form.value.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
})

// Fetch Categories
const fetchCategories = async () => {
  isLoading.value = true
  try {
    const response = await devlogCategoryService.getAll()
    categories.value = response.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    toast.error('Failed to load categories')
  } finally {
    isLoading.value = false
  }
}

// Modal Actions
const openAddModal = () => {
  isEditMode.value = false
  activeCategory.value = null
  form.value = {
    name: '',
    slug: '',
    description: ''
  }
  showModal.value = true
}

const openEditModal = (category: DevlogCategory) => {
  isEditMode.value = true
  activeCategory.value = category
  form.value = {
    name: category.name,
    slug: category.slug,
    description: category.description || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    activeCategory.value = null
  }, 200)
}

const openDeleteModal = (category: DevlogCategory) => {
  activeCategory.value = category
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  setTimeout(() => {
    if (!showModal.value) activeCategory.value = null
  }, 200)
}

// Save Category (Create/Update)
const saveCategory = async () => {
  isSaving.value = true
  try {
    if (isEditMode.value && activeCategory.value) {
      // Update
      await devlogCategoryService.update(activeCategory.value.id, form.value)
      toast.success('Category updated successfully')
    } else {
      // Create
      await devlogCategoryService.create(form.value)
      toast.success('Category created successfully')
    }
    closeModal()
    fetchCategories()
  } catch (error: any) {
    console.error('Save category error:', error)
    toast.error(error.response?.data?.message || 'Failed to save category')
  } finally {
    isSaving.value = false
  }
}

// Delete Category
const deleteCategory = async () => {
  if (!activeCategory.value) return
  
  isDeleting.value = true
  try {
    await devlogCategoryService.delete(activeCategory.value.id)
    toast.success('Category deleted successfully')
    closeDeleteModal()
    fetchCategories()
  } catch (error: any) {
    console.error('Delete category error:', error)
    toast.error(error.response?.data?.message || 'Failed to delete category')
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>
