<script setup lang="ts">
import type { Wishlist } from '~/app/types'
import { Link } from '@inertiajs/vue3'
import Card from '~/components/ui/card.vue'

defineProps<{ wishlist: Wishlist }>()
</script>

<template>
  <Link :href="`/wishlists/${wishlist.id}`" class="card">
    <Card>
      <div class="card__header">
        <div class="card__header__image">
          <!-- <img :src="wishlist.image" alt="wishlist.title" /> -->
        </div>
        <div class="card__header__title">
          <p>{{ wishlist.title }}</p>
        </div>
      </div>
    </Card>
  </Link>
</template>

<style scoped lang="scss">
.card {
  height: 16.5rem;
  background-color: whitesmoke;
}
</style>
