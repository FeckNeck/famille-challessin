import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import type { User } from '~/types'

export function useCurrentUser() {
  return computed(() => usePage().props.user as User)
}
