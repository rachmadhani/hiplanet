<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    
    <div class="space-y-6">
      <!-- Search, Filter & Toolbar -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, email or country..."
            class="w-full pl-10 pr-4 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>
        
        <!-- Status Filter -->
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</label>
          <select
            v-model="statusFilter"
            class="px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <!-- Data Table Card -->
      <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Tester</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Platform</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Country</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">NDA Agreed</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Why Test</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Status</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Submitted</p>
                </th>
                <th class="px-5 py-3 text-right sm:px-6">
                  <p class="font-semibold text-gray-500 text-theme-xs dark:text-gray-400 uppercase">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="isLoading" class="border-t border-gray-100 dark:border-gray-800">
                <td colspan="8" class="px-5 py-10 text-center sm:px-6">
                  <div class="flex flex-col items-center justify-center space-y-2">
                    <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Loading tester applications...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredApplications.length === 0" class="border-t border-gray-100 dark:border-gray-800">
                <td colspan="8" class="px-5 py-10 text-center sm:px-6">
                  <span class="text-sm text-gray-500 dark:text-gray-400">No applications found.</span>
                </td>
              </tr>
              <tr
                v-for="app in filteredApplications"
                :key="app.id"
                class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/[0.01]"
              >
                <!-- Tester Details -->
                <td class="px-5 py-4 sm:px-6">
                  <div>
                    <span class="block font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                      {{ app.name }}
                    </span>
                    <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {{ app.email }}
                    </span>
                  </div>
                </td>
                <!-- Platform -->
                <td class="px-5 py-4 sm:px-6">
                  <span class="px-2.5 py-1 text-theme-xs font-medium rounded-md bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    {{ app.platform }}
                  </span>
                </td>
                <!-- Country -->
                <td class="px-5 py-4 sm:px-6">
                  <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ app.country || 'N/A' }}</p>
                </td>
                <!-- NDA -->
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex items-center">
                    <span v-if="app.nda" class="text-green-500" title="NDA signed">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span v-else class="text-red-500" title="NDA not signed">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </span>
                  </div>
                </td>
                <!-- Why Test -->
                <td class="px-5 py-4 sm:px-6 max-w-xs truncate" :title="app.why">
                  <p class="text-gray-500 text-theme-sm dark:text-gray-400 truncate">{{ app.why }}</p>
                </td>
                <!-- Status -->
                <td class="px-5 py-4 sm:px-6">
                  <span
                    :class="[
                      'rounded-full px-2.5 py-1 text-theme-xs font-medium capitalize',
                      {
                        'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                          app.status === 'approved',
                        'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                          app.status === 'pending',
                        'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                          app.status === 'rejected',
                      },
                    ]"
                  >
                    {{ app.status }}
                  </span>
                </td>
                <!-- Submitted Date -->
                <td class="px-5 py-4 sm:px-6">
                  <p class="text-gray-500 text-theme-xs dark:text-gray-400">{{ formatDate(app.createdAt) }}</p>
                </td>
                <!-- Actions -->
                <td class="px-5 py-4 text-right sm:px-6">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openEditModal(app)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                      title="Update Status"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <!-- Send Build Update Button -->
                    <button
                      @click="app.status === 'approved' ? openBuildModal(app) : null"
                      :disabled="app.status !== 'approved'"
                      :class="[
                        'p-1.5 rounded-lg transition-colors duration-200',
                        app.status === 'approved'
                          ? 'text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400'
                          : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                      ]"
                      :title="app.status === 'approved' ? 'Send Build Update' : 'Tester must be approved to send build updates'"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                    </button>
                    <button
                      @click="confirmDelete(app)"
                      class="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-red-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400"
                      title="Delete Application"
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
            Showing Page <span class="font-medium text-gray-800 dark:text-white">{{ pagination.currentPage }}</span> of <span class="font-medium text-gray-800 dark:text-white">{{ pagination.totalPages }}</span> (Total {{ pagination.totalItems }} applications)
          </p>
          <div class="flex items-center gap-2">
            <button
              @click="changePage(pagination.currentPage - 1)"
              :disabled="pagination.currentPage === 1"
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Previous
            </button>
            <button
              v-for="p in pageNumbers"
              :key="p"
              @click="changePage(p)"
              :class="[
                'inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-lg',
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
              class="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
        <h4 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Update Application Status</h4>
        <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          Modify the application status of <span class="font-semibold text-gray-700 dark:text-white">{{ activeApp?.name }}</span>.
        </p>

        <form @submit.prevent="updateStatus">
          <div class="space-y-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Status</label>
              <select
                v-model="editStatus"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Build Platform</label>
              <select
                v-model="editBuild"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
                <option value="MacOS">MacOS</option>
                <option value="Windows">Windows</option>
              </select>
            </div>
            
            <div class="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                @click="closeEditModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isUpdating"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 shadow-theme-xs"
              >
                {{ isUpdating ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Send Build Update Modal -->
    <div v-if="showBuildModal" class="fixed inset-0 z-[999999] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-xs p-4">
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
        <h4 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Send Build Update</h4>
        <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          Send a build update email to <span class="font-semibold text-gray-700 dark:text-white">{{ activeApp?.name }}</span> ({{ activeApp?.email }}).
        </p>

        <form @submit.prevent="sendBuildUpdate">
          <div class="space-y-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Build Version</label>
              <input
                v-model="buildVersion"
                type="text"
                required
                placeholder="e.g. v1.2.0-beta"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Patch Notes</label>
              <textarea
                v-model="patchNotes"
                required
                rows="4"
                placeholder="e.g. - Added new biome: Eolian Sands&#10;- Fixed audio stutter on low-end machines"
                class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              ></textarea>
            </div>
            
            <div class="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                @click="closeBuildModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSendingBuild"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 shadow-theme-xs"
              >
                {{ isSendingBuild ? 'Sending...' : 'Send Update' }}
              </button>
            </div>
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
          <h4 class="text-lg font-semibold dark:text-white/90">Delete Application</h4>
        </div>
        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete the application from <span class="font-semibold text-gray-700 dark:text-white">{{ activeApp?.name }}</span>? This action is permanent and cannot be undone.
        </p>

        <div class="flex items-center justify-end gap-3">
          <button
            type="button"
            @click="closeDeleteModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            @click="deleteApplication"
            :disabled="isDeleting"
            class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 shadow-theme-xs"
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
import { testerService, type TesterApplication } from '@/services/testerService'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'

const currentPageTitle = ref('Tester Applications')
const applications = ref<TesterApplication[]>([])
const isLoading = ref(true)
const isUpdating = ref(false)
const isDeleting = ref(false)

const searchQuery = ref('')
const statusFilter = ref('all')

const pagination = ref({
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  limit: 10
})

const toast = useToast()

// Modals State
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showBuildModal = ref(false)
const activeApp = ref<TesterApplication | null>(null)
const editStatus = ref<'pending' | 'approved' | 'rejected'>('pending')
const editBuild = ref<'MacOS' | 'Windows'>('MacOS')

// Build Update State
const buildVersion = ref('')
const patchNotes = ref('')
const isSendingBuild = ref(false)

// Fetch Applications
const fetchApplications = async () => {
  isLoading.value = true
  try {
    const response = await testerService.getAll(pagination.value.currentPage, pagination.value.limit)
    applications.value = response.data
    pagination.value = {
      totalItems: response.pagination.totalItems,
      totalPages: response.pagination.totalPages,
      currentPage: response.pagination.currentPage,
      limit: response.pagination.limit
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to fetch tester applications.'
    toast.error(msg)
  } finally {
    isLoading.value = false
  }
}

// Client-side filtering based on search query & status selector
const filteredApplications = computed(() => {
  return applications.value.filter((app) => {
    // 1. Search Query
    const query = searchQuery.value.toLowerCase().trim()
    const matchesSearch = query === '' || 
      app.name.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      (app.country && app.country.toLowerCase().includes(query))
    
    // 2. Status Filter
    const matchesStatus = statusFilter.value === 'all' || app.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

// Pagination navigation
const changePage = (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return
  pagination.value.currentPage = page
  fetchApplications()
}

// Compute page number buttons
const pageNumbers = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= pagination.value.totalPages; i++) {
    pages.push(i)
  }
  return pages
})

// Modals Open/Close
const openEditModal = (app: TesterApplication) => {
  activeApp.value = app
  editStatus.value = app.status
  editBuild.value = app.build_platform
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  activeApp.value = null
}

const confirmDelete = (app: TesterApplication) => {
  activeApp.value = app
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  activeApp.value = null
}

const openBuildModal = (app: TesterApplication) => {
  activeApp.value = app
  buildVersion.value = ''
  patchNotes.value = ''
  showBuildModal.value = true
}

const closeBuildModal = () => {
  showBuildModal.value = false
  activeApp.value = null
}

// Format Date string
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Update Status handler
const updateStatus = async () => {
  if (!activeApp.value) return
  isUpdating.value = true
  try {
    await testerService.update(activeApp.value.id, { status: editStatus.value, build_platform: editBuild.value })
    toast.success(`Successfully updated status to "${editStatus.value}" and build platform to "${editBuild.value}"`)
    closeEditModal()
    fetchApplications() // Refresh current view
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to update application status.'
    toast.error(msg)
  } finally {
    isUpdating.value = false
  }
}

// Delete Application handler
const deleteApplication = async () => {
  if (!activeApp.value) return
  isDeleting.value = true
  try {
    const response = await testerService.delete(activeApp.value.id)
    toast.success(response.message || 'Successfully deleted application.')
    closeDeleteModal()
    
    // Adjust current page if we deleted the last item on the page
    if (applications.value.length === 1 && pagination.value.currentPage > 1) {
      pagination.value.currentPage--
    }
    fetchApplications()
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to delete application.'
    toast.error(msg)
  } finally {
    isDeleting.value = false
  }
}

// Send Build Update handler
const sendBuildUpdate = async () => {
  if (!activeApp.value) return
  isSendingBuild.value = true
  try {
    const result = await testerService.sendBuildUpdate(activeApp.value.id, {
      buildVersion: buildVersion.value,
      patchNotes: patchNotes.value
    })
    toast.success(result.message || `Successfully sent build update email to ${activeApp.value.email}`)
    closeBuildModal()
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to send build update email.'
    toast.error(msg)
  } finally {
    isSendingBuild.value = false
  }
}

onMounted(() => {
  fetchApplications()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
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
