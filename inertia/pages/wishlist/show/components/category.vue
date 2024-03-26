<script setup lang="ts">
import { defineProps } from 'vue'
import type { WishlistCategory } from '../../../../app/types'
import Gift from './gift.vue'

defineProps<{
  category: WishlistCategory
}>()
</script>

<template>
  <div class="category">
    <h3>{{ category.name }}</h3>
    <div class="category__gifts">
      <Gift v-for="item in category.gifts" :key="item.id" :gift="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  h3 {
    margin-bottom: 1rem;
  }

  &__gifts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
