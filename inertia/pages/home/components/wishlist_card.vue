<script setup lang="ts">
import type { Wishlist } from '~/app/types'
import { Link } from '@inertiajs/vue3'

defineProps<{ wishlist: Wishlist }>()
</script>

<template>
  <Link :href="`/wishlists/${wishlist.id}`" class="card">
    <div class="card__header">
      <div class="card__header__image">
        <!-- <img :src="wishlist.image" alt="wishlist.title" /> -->
      </div>
      <div class="card__header__title">
        <h2>{{ wishlist.title }}</h2>
      </div>
    </div>
  </Link>
</template>

<style scoped lang="scss">
.card {
  height: 16.5rem;
  background-color: whitesmoke;
}
</style>
