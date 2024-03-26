<script setup lang="ts">
import { defineProps } from 'vue'
import type { Wishlist } from '../../../app/types'
import Layout from '../../../layouts/default.vue'
import Hero from './components/hero.vue'
import Category from './components/category.vue'

const wishlist = defineProps<Wishlist>()
</script>

<template>
  <Layout>
    <div class="container">
      <div class="wishlist">
        <Hero :wishlist="wishlist" />
        <!-- <div class="wishlist__categories">
          <h2>Items</h2>
          <div v-for="category in wishlist.categories" :key="category.id">
            <h3>{{ category.name }}</h3>
            <div v-for="gift in category.gifts" :key="gift.id" class="gif">
              <img :src="gift.image" :alt="gift.title + 'image'" />
              <div>
                <p>{{ gift.title }}</p>
                <p>{{ gift.description }}</p>
                <p>{{ gift.price }}</p>
                <p v-if="gift.isReserved">{{ gift.giverName }}</p>
                <button v-else>Reserver le cadeau</button>
              </div>
            </div>
          </div>
        </div> -->
        <Category v-for="category in wishlist.categories" :key="category.id" :category="category" />
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
