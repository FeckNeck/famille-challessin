import { PageProps } from '@adonisjs/inertia/types'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

export function useCurrentUser() {
  return computed(() => usePage<PageProps>().props.user as Data.Auth.User | null)
}
