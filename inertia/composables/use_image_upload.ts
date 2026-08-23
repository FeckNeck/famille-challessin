import { FileUpload } from '@ark-ui/vue'
import { useObjectUrl } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

export const useImageUpload = (image: string | null) => {
  const uploadedFile = shallowRef()
  const uploadedFileUrl = useObjectUrl(uploadedFile)

  const uploadedFilePreview = computed(() => uploadedFileUrl.value ?? image ?? null)

  function onfileChange(event: FileUpload.FileAcceptDetails) {
    if (event.files.length === 1 && event.files[0].type.startsWith('image/')) {
      uploadedFile.value = event.files[0]
    }
  }

  return {
    uploadedFile,
    uploadedFilePreview,
    onfileChange,
  }
}
