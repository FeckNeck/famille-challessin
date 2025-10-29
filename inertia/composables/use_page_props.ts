import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

export function usePageProps() {
  return computed(() => usePage().props)
}
