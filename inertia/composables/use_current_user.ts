import { computed } from 'vue';
import { Data } from '@generated/data';
import { usePage } from '@inertiajs/vue3';
import { PageProps } from '@adonisjs/inertia/types';

export function useCurrentUser() {
  return computed(() => usePage<PageProps>().props.user as Data.Auth.User | null);
}
