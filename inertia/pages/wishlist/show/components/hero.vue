<script setup lang="ts">
import type { Wishlist } from '~/types'

defineProps<{
  wishlist: Wishlist
}>()
</script>

<template>
  <div class="hero">
    <div :style="{ backgroundImage: `url(${wishlist.image})` }" class="hero-img"></div>
    <div class="hero__content">
      <h1>{{ wishlist.title }}</h1>
      <p>{{ wishlist.eventDate }}</p>
      <p>{{ wishlist.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  &-img {
    display: block;
    width: 25rem;
    height: 25rem;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
  }

  &__content {
    flex: 1;
    max-width: 40rem;
  }
}
</style>
