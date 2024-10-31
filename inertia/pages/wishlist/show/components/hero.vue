<script setup lang="ts">
import type { Wishlist } from '~/types'
import { useDateFormat } from '@vueuse/core'
const props = defineProps<{
  wishlist: Wishlist
}>()

const eventDate = useDateFormat(props.wishlist.eventDate, 'D MMMM YYYY', {
  locales: 'fr-FR',
})
</script>

<template>
  <div class="hero">
    <div>
      <img :src="wishlist.imageUrl" :alt="wishlist.title + ' image'" />
    </div>
    <div class="p-6 d-flex column g-2">
      <p>{{ wishlist.title }}</p>
      <div class="d-flex items-center">
        <hr />
        <p>{{ eventDate }}</p>
        <hr />
      </div>
      <p>{{ wishlist.description }}</p>
    </div>
  </div>
</template>

<style scoped>
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

  & > div:first-child {
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

  & p {
    background-color: var(--white);
    text-align: center;
    font-style: italic;

    &:first-child {
      font-style: italic;
      font-size: var(--text-xl);
      font-weight: bold;
    }

    &:nth-child(2) {
      padding-inline: 1rem;
      font-size: var(--text-base);
    }

    &:last-child {
      font-size: var(--text-lg);
    }
  }

  & hr {
    flex: 1;
    height: 1px;
    border: 0;
    background-color: var(--gray-800);
  }

  @media (max-width: 768px) {
    height: 100%;
  }
}
</style>
