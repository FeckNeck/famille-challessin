<script setup lang="ts">
import type { Wishlist } from '~/app/types'
import Layout from '~/layouts/default.vue'
import Hero from './components/hero.vue'
import Category from './components/category.vue'

const wishlist = defineProps<Wishlist>()
</script>

<template>
  <Layout>
    <div class="container">
      <div class="wishlist">
        <Hero :wishlist="wishlist" />
        <Category v-for="category in wishlist.categories" :key="category.id" :category="category" />
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
