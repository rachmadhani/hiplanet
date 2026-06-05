<template>
  <div class="border border-gray-300 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-theme-xs focus-within:ring-3 focus-within:ring-brand-500/10 focus-within:border-brand-300 dark:focus-within:border-brand-800 transition-all">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
      <!-- Bold -->
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('bold') }
        ]"
        title="Bold"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"></path>
        </svg>
      </button>

      <!-- Italic -->
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('italic') }
        ]"
        title="Italic"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 20l4-16m-4 0h4m-8 16h4"></path>
        </svg>
      </button>

      <!-- Strike -->
      <button
        type="button"
        @click="editor.chain().focus().toggleStrike().run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('strike') }
        ]"
        title="Strike"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 0a3 3 0 110-6h6m-6 6a3 3 0 100 6h6"></path>
        </svg>
      </button>

      <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <!-- Heading 1 -->
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('heading', { level: 1 }) }
        ]"
        title="Heading 1"
      >
        <span class="text-xs font-bold font-sans">H1</span>
      </button>

      <!-- Heading 2 -->
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('heading', { level: 2 }) }
        ]"
        title="Heading 2"
      >
        <span class="text-xs font-bold font-sans">H2</span>
      </button>

      <!-- Heading 3 -->
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('heading', { level: 3 }) }
        ]"
        title="Heading 3"
      >
        <span class="text-xs font-bold font-sans">H3</span>
      </button>

      <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <!-- Bullet List -->
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('bulletList') }
        ]"
        title="Bullet List"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16M4 6h.01M4 12h.01M4 18h.01"></path>
        </svg>
      </button>

      <!-- Ordered List -->
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('orderedList') }
        ]"
        title="Ordered List"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01"></path>
        </svg>
      </button>

      <!-- Blockquote -->
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="[
          'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
          { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': editor.isActive('blockquote') }
        ]"
        title="Blockquote"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 18h4a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v9a2 2 0 002 2zm10 0h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v9a2 2 0 002 2z"></path>
        </svg>
      </button>

      <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <!-- Image Insert Button -->
      <div class="relative" ref="imageDropdownRef">
        <button
          type="button"
          @click="toggleImageDropdown"
          :class="[
            'p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors',
            { 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white': showImageDropdown }
          ]"
          title="Insert Image"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </button>

        <!-- Image Dropdown Panel -->
        <div
          v-if="showImageDropdown"
          class="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4"
        >
          <!-- Tab Selector -->
          <div class="flex mb-3 bg-gray-100 dark:bg-gray-700/50 rounded-md p-0.5">
            <button
              type="button"
              @click="imageTab = 'url'"
              :class="[
                'flex-1 text-xs font-medium py-1.5 rounded-md transition-colors',
                imageTab === 'url'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              ]"
            >
              URL
            </button>
            <button
              type="button"
              @click="imageTab = 'upload'"
              :class="[
                'flex-1 text-xs font-medium py-1.5 rounded-md transition-colors',
                imageTab === 'upload'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              ]"
            >
              Upload
            </button>
          </div>

          <!-- URL Tab -->
          <div v-if="imageTab === 'url'">
            <input
              v-model="imageUrl"
              type="text"
              placeholder="https://example.com/image.jpg"
              class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
              @keydown.enter.prevent="insertImageFromUrl"
            />
            <input
              v-model="imageAlt"
              type="text"
              placeholder="Alt text (optional)"
              class="w-full mt-2 px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <button
              type="button"
              @click="insertImageFromUrl"
              :disabled="!imageUrl.trim()"
              class="mt-3 w-full py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Insert Image
            </button>
          </div>

          <!-- Upload Tab -->
          <div v-if="imageTab === 'upload'">
            <label
              class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-brand-400 dark:hover:border-brand-600 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <div class="flex flex-col items-center justify-center pt-2 pb-2">
                <svg class="w-7 h-7 mb-1.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  <span class="font-semibold text-brand-500">Click to upload</span> or drag & drop
                </p>
                <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">PNG, JPG, GIF, WEBP (Max 5MB)</p>
              </div>
              <input
                type="file"
                class="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp"
                @change="onEditorImageSelected"
              />
            </label>
            <!-- Upload preview -->
            <div v-if="uploadPreviewUrl" class="mt-3 relative">
              <img :src="uploadPreviewUrl" alt="Preview" class="w-full max-h-32 object-contain rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              <button
                type="button"
                @click="clearUploadPreview"
                class="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <input
              v-model="imageAlt"
              type="text"
              placeholder="Alt text (optional)"
              class="w-full mt-2 px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <button
              type="button"
              @click="insertUploadedImage"
              :disabled="!uploadPreviewUrl"
              class="mt-3 w-full py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>

      <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <!-- Undo -->
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        class="p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
        title="Undo"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
        </svg>
      </button>

      <!-- Redo -->
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        class="p-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
        title="Redo"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"></path>
        </svg>
      </button>
    </div>

    <!-- Content Area -->
    <editor-content
      :editor="editor"
      class="prose prose-sm dark:prose-invert max-w-none px-4 py-3 min-h-[200px] text-gray-800 dark:text-white/90 outline-none focus:outline-hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { ref, watch, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Image dropdown state
const showImageDropdown = ref(false)
const imageTab = ref<'url' | 'upload'>('url')
const imageUrl = ref('')
const imageAlt = ref('')
const uploadPreviewUrl = ref('')
const imageDropdownRef = ref<HTMLElement | null>(null)

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: {
        class: 'editor-image',
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'focus:outline-hidden outline-hidden min-h-[200px]'
    }
  }
})

// Toggle image dropdown
const toggleImageDropdown = () => {
  showImageDropdown.value = !showImageDropdown.value
  if (showImageDropdown.value) {
    imageUrl.value = ''
    imageAlt.value = ''
    uploadPreviewUrl.value = ''
    imageTab.value = 'url'
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (imageDropdownRef.value && !imageDropdownRef.value.contains(event.target as Node)) {
    showImageDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
})

// Insert image from URL
const insertImageFromUrl = () => {
  if (!imageUrl.value.trim() || !editor.value) return
  editor.value
    .chain()
    .focus()
    .setImage({ src: imageUrl.value.trim(), alt: imageAlt.value || undefined })
    .run()
  showImageDropdown.value = false
  imageUrl.value = ''
  imageAlt.value = ''
}

// Handle file selection for upload
const onEditorImageSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    alert('Image file size must be less than 5MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    uploadPreviewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Reset the input so the same file can be selected again
  target.value = ''
}

// Clear upload preview
const clearUploadPreview = () => {
  uploadPreviewUrl.value = ''
}

// Insert uploaded image (base64)
const insertUploadedImage = () => {
  if (!uploadPreviewUrl.value || !editor.value) return
  editor.value
    .chain()
    .focus()
    .setImage({ src: uploadPreviewUrl.value, alt: imageAlt.value || undefined })
    .run()
  showImageDropdown.value = false
  uploadPreviewUrl.value = ''
  imageAlt.value = ''
}

// Sync component v-model value with editor content
watch(() => props.modelValue, (value) => {
  if (editor.value) {
    const isSame = editor.value.getHTML() === value
    if (!isSame) {
      editor.value.commands.setContent(value, { emitUpdate: false })
    }
  }
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style>
/* Style adjustments for Prosemirror content */
.ProseMirror {
  outline: none;
  min-height: 200px;
}

.ProseMirror p {
  margin-bottom: 0.5rem;
}

.ProseMirror h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.ProseMirror h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.75rem;
  margin-bottom: 0.4rem;
}

.ProseMirror h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
}

.ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.ProseMirror blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  color: #6b7280;
}
.dark .ProseMirror blockquote {
  border-left-color: #1d4ed8;
  color: #9ca3af;
}

/* Editor image styles */
.ProseMirror img.editor-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 0.75rem 0;
  cursor: default;
  transition: box-shadow 0.2s ease;
}

.ProseMirror img.editor-image:hover {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.ProseMirror img.ProseMirror-selectednode {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 0.5rem;
}
</style>
