<script setup lang="ts">
import type { Wishlist } from '~/types'

defineProps<{
  wishlist: Wishlist
}>()
</script>

<template>
  <div class="hero">
    <div>
      <img :src="wishlist.imageUrl" :alt="wishlist.title + ' image'" />
    </div>
    <p>
      {{ wishlist.title }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.hero {
  background-color: var(--white);
  border-radius: var(--rounded-lg);
  border: 2px solid black;
  box-shadow: var(--shadow-medium);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  margin-bottom: 2rem;
  padding: 1rem 1rem 0 1rem;

  & > div {
    border: 2px solid var(--gray-800);
    overflow: hidden;
    border-radius: var(--rounded);

    & > img {
      height: 100%;
      object-fit: cover;
      width: 100%;
      border-radius: var(--rounded);
    }
  }

  p {
    width: 100%;
    padding: 2rem;
    background-color: var(--white);
    text-align: center;
    font-size: var(--text-xl);
    font-style: italic;
  }
}
</style>
