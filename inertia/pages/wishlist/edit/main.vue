<script setup lang="ts">
  import { Head } from '@inertiajs/vue3';
  import type { Data } from '@generated/data';

  import Hero from './components/hero.vue';
  import Layout from '~/layouts/default.vue';
  import Category from './components/category.vue';
  import CreateCategory from './components/create_category.vue';

  const props = defineProps<{
    themes: Data.Wishlists.WishlistTheme[];
    wishlist: Data.Wishlists.Wishlist;
  }>();
</script>

<template>
  <Head title="Création d'une liste" />
  <Layout>
    <div class="container">
      <div class="wishlist">
        <!-- Edit wishlist -->
        <Hero :themes="props.themes" :wishlist="props.wishlist" />

        <!-- Create category-->
        <CreateCategory :wishlistId="props.wishlist.id" />

        <!-- Categories -->
        <div class="d-flex column g-4" v-auto-animate>
          <Category
            v-for="category in props.wishlist.categories"
            :key="category.id"
            :category="category" />
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
