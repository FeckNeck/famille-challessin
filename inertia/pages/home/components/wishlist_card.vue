<script setup lang="ts">
import type { Wishlist } from '~/app/types'
import { Link } from '@inertiajs/vue3'
import Card from '~/components/ui/card.vue'

defineProps<{ wishlist: Wishlist }>()
</script>

<template>
  <Link :href="`/wishlists/${wishlist.id}`" class="card">
    <Card>
      <h6>{{ wishlist.title }}</h6>
      <div class="card__header__image">
        <img :src="wishlist.imageUrl" alt="wishlist.title" />
      </div>
      <div class="card__content">
        <p class="card__content__desc">{{ wishlist.description }}</p>
        <div class="d-flex items-center justify-between">
          <p class="card__content__event">{{ wishlist.eventDate }}</p>
          <p class="card__content__event">{{ wishlist.theme.name }}</p>
        </div>
      </div>
    </Card>
  </Link>
</template>

<style scoped lang="scss">
.card {
  height: 16.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  h6 {
    padding: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    background-color: var(--cyan-200);
    border-bottom: 2px solid var(--gray-800);
  }

  img {
    width: 100%;
    height: 5rem;
    object-fit: cover;
  }

  .card__content {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    gap: 1rem;

    &__desc {
      font-size: var(--text-sm);
    }

    &__event {
      font-size: var(--text-xs);
    }
  }
}
</style>
