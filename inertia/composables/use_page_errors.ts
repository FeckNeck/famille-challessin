import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { PageProps } from '@adonisjs/inertia/types';

export function usePageErrors() {
  return computed(() => usePage<PageProps>().props.errors || {});
}
