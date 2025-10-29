<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'
import Category from './components/category.vue'
import CreateCategory from './components/create_category.vue'
import Hero from './components/hero.vue'
import type { WishlistTheme, Wishlist } from '~/types'

const { themes, wishlist } = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()
</script>

<template>
  <Head title="Création d'une liste" />
  <Layout>
    <div class="container">
      <div class="wishlist">
        <!-- Edit wishlist -->
        <Hero :themes="themes" :wishlist="wishlist" />

        <!-- Create category -->
        <CreateCategory :wishlist-id="wishlist.id" />

        <!-- Categories & gifts -->
        <div v-auto-animate class="d-flex column g-4">
          <Category
            v-for="category in wishlist.categories"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.wishlist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
