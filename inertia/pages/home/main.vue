<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'
import Input from '~/components/ui/input.vue'
import type { HomeResponse, UserWishlistFilter } from '~/app/types'
import { useUrlSearchParams, watchDebounced } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<HomeResponse>()
const params = useUrlSearchParams<Partial<UserWishlistFilter>>('history')

const scrollToTopRef = ref<HTMLElement | null>(null)

function scrollToTop() {
  if (!scrollToTopRef.value) return
  scrollToTopRef.value.scrollIntoView({ behavior: 'smooth' })
}

const search = ref<string>((params.title as string) || '')
watchDebounced(search, () => fetchNewPageData(1), { debounce: 400 })

const usernames = ref<string[]>(props.usernames)
const Currentusername = ref<string>(params.username || '')

function fetchNewPageData(page: number) {
  console.log('page:', page)
  const props = {
    page,
    username: params.username,
    search: search.value,
  }

  // router.get('/', props, { preserveState: true, preserveScroll: true })
  // scrollToTop()
}
</script>

<template>
  <Head title="Homepage" />
  <Layout>
    <div class="container">
      <div></div>
      <h1>Homepage</h1>
      <Input v-model="search" placeholder="Search by title" type="text"/>
      <div class="titou">
        <div class="families">
          <button v-for="username in usernames" :key="username">
            {{ username }}
          </button>
        </div>
        <div <div v-for="wishlist in props.wishlists" :key="wishlist.id">
        {{ wishlist.title }}
        </div>
      </div>
      <Link href="/modal" as="button" type="button">Modal</Link>
      <span>
        Learn more about AdonisJS and Inertia.js by visiting the
        <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
      </span>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.titou{
  display: flex;
  gap: 1rem;
}

.families  {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
