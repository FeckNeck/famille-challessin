<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import { useUrlSearchParams, watchDebounced } from '@vueuse/core'
import Filters from './components/filters.vue'
import Input from '~/components/ui/input.vue'
import Layout from '~/layouts/default.vue'
import MainSection from './components/main_section.vue'
import Pagination from './components/pagination.vue'
import { Search } from 'lucide-vue-next'
import type { WishlistTheme, HomeResponse, UserWishlistFilter, User } from '~/app/types'
import Hero from './components/hero.vue'

const props = defineProps<HomeResponse>()
const params = useUrlSearchParams<Partial<UserWishlistFilter>>('history')

const scrollToTopRef = ref<HTMLElement | null>(null)

function scrollToTop() {
  if (!scrollToTopRef.value) return
  scrollToTopRef.value.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Search
 */
const search = ref<string>((params.title as string) || '')
watchDebounced(search, () => fetchNewPageData(1), { debounce: 400 })

/**
 * Filters
 */
const users = ref<User[]>(props.users)
const username = ref<string>(params.username || '')
const themes = ref<WishlistTheme[]>(props.themes)
const theme = ref<string>(params.theme || '')

/**
 * Refetch when any of the filters change
 */
watch([username, theme], () => {
  fetchNewPageData(1)
})

function fetchNewPageData(page: number) {
  const props = {
    page,
    username: username.value,
    theme: theme.value,
    title: search.value,
  }

  router.get('/', props, { preserveState: true, preserveScroll: true })
  scrollToTop()
}
</script>

<template>
  <Head title="Homepage" />
  <Layout>
    <Hero />
    <div class="relative" ref="scrollToTopRef">
      <div class="container">
        <div class="whishlists">
          <Filters
            :themes="themes"
            :users="users"
            v-model:username="username"
            v-model:theme="theme"
          />
          <div class="whishlists__content">
            <div class="whishlists__content__filters">
              <Input
                v-model:input="search"
                placeholder="Search by title"
                type="search"
                :rounded="true"
              >
                <template #left-icon>
                  <Search />
                </template>
              </Input>
              <select v-model="username">
                <option value="">Tous</option>
                <option v-for="user in users" :key="user.id" :value="user.username">
                  {{ user.username }}
                </option>
              </select>
            </div>
            <MainSection :wishlists="props.wishlists" />
            <Pagination
              :total="meta.total"
              :last-page="meta.lastPage"
              :current-page="meta.currentPage"
              @update="fetchNewPageData"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.whishlists {
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 18rem 1fr;
    gap: 3rem;
    align-items: flex-start;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    &__filters {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;

      @media (min-width: 768px) {
        flex-direction: row;
      }

      select {
        display: block;

        @media (min-width: 768px) {
          display: none;
        }
      }
    }
  }
}
</style>
