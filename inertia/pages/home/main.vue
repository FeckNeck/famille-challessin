<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { useUrlSearchParams, watchDebounced } from '@vueuse/core'
import Filters from './components/filters.vue'
import Hero from './components/hero.vue'
import Input from '~/components/ui/input.vue'
import Layout from '~/layouts/default.vue'
import MainSection from './components/main_section.vue'
import Order from './components/order.vue'
import Pagination from './components/pagination.vue'
import type { WishlistTheme, HomeResponse, WishlistFilter, User, SortOrder } from '~/app/types'
import Select from '~/components/ui/select.vue'

const props = defineProps<HomeResponse>()
const params = useUrlSearchParams<Partial<WishlistFilter>>('history')

const scrollToTopRef = ref<HTMLElement | null>(null)

function scrollToTop() {
  if (!scrollToTopRef.value) return
  scrollToTopRef.value.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Search
 */
const search = ref<string>((params.search as string) || '')
watchDebounced(search, () => fetchNewPageData(1), { debounce: 400 })

/**
 * Order by
 */
const orderByOptions = [
  { label: 'Titre', value: 'title', description: 'Trier les listes par leur nom' },
  {
    label: 'Date de création',
    value: 'created_at',
    description: 'Trier les listes par leur date de création',
  },
  {
    label: 'Date de mise à jour',
    value: 'updated_at',
    description: 'Trier les listes par leur date de mise à jour',
  },
  {
    label: "Date d'évènement",
    value: 'event_date',
    description: "Trier les listes par leur date d'évènement",
  },
]
const order = ref<SortOrder>(params.order || 'asc')
const orderBy = ref<string[]>([params.orderBy || orderByOptions[0].value])

/**
 * Filters
 */
const users = ref<User[]>(props.users)
const usersOptions = [
  { label: 'All', value: '' },
  ...props.users.map((user) => ({ label: user.username, value: user.username })),
]
const username = ref<string[]>([params.username || ''])
const themes = ref<WishlistTheme[]>(props.themes)
const theme = ref<string>(params.theme || '')

/**
 * Refetch when any of the filters change
 */
watch([username, theme, order, orderBy], () => {
  console.log('theme:', theme)
  fetchNewPageData(1)
})

function fetchNewPageData(page: number) {
  const props = {
    page,
    order: order.value,
    orderBy: orderBy.value[0],
    username: username.value[0],
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
        <div class="whishlist">
          <Filters
            :themes="themes"
            :users="users"
            v-model:username="username"
            v-model:theme="theme"
          />
          <div class="whishlist__content">
            <div class="whishlist__content__filters">
              <Input
                v-model:input="search"
                placeholder="Search by title"
                type="search"
                radius="rfull"
                class="whishlist__content__filters__search"
              >
                <template #left-icon>
                  <Search />
                </template>
              </Input>
              <Select
                :items="usersOptions"
                v-model:model-value="username"
                class="whishlist__content__filters__users"
              />
              <div class="whishlist__content__filters__order">
                <Order v-model:order="order" />
                <Select :items="orderByOptions" v-model:model-value="orderBy" />
              </div>
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
.whishlist {
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
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;

      &__search {
        width: 100%;
      }

      &__users {
        display: block;
      }

      &__order {
        display: flex;
        width: 100%;
      }

      @media (min-width: 768px) {
        flex-direction: row;

        &__search {
          width: 250px;
        }

        &__users {
          display: none;
        }

        &__order {
          width: 275px;
        }
      }
    }
  }
}
</style>
