import { useObjectUrl } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

export const useImageUpload = () => {
  const file = shallowRef()
  const url = useObjectUrl(file)

  const imageUrl = computed(() => {
    return url.value ?? imageUrl ?? null
  })

  function onFileChange(e: Event) {
    file.value = (e.target as HTMLInputElement).files![0]
  }
}
