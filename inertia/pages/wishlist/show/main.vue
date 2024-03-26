<script setup lang="ts">
import { defineProps } from 'vue'
import type { Wishlist } from '../../../app/types'
import Layout from '../../../layouts/default.vue'

const props = defineProps<Wishlist>()
</script>

<template>
  <Layout>
    <div class="container">
      <h1>Wishlist</h1>
      <p>{{ props }}</p>
    </div>
  </Layout>
</template>

<style scoped></style>
