<script setup lang="ts">
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import Card from '~/components/ui/card.vue'
import type { Wishlist, User } from '~/app/types'

const page = usePage()
const user = computed(() => page.props.user as User | undefined)
const props = defineProps<{ wishlist: Wishlist }>()

const editLink = computed(() => (props.wishlist.user.id === user.value?.id ? '/edit/' : ''))
</script>

<template>
  <Link :href="`/wishlists/${wishlist.id}${editLink}`" class="card">
    <Card>
      <div>
        <h6 :style="{ backgroundColor: wishlist.user.iconColor }">{{ wishlist.title }}</h6>
        <div class="card__header__image">
          <img :src="wishlist.imageUrl" :alt="wishlist.title + 'image'" />
        </div>
      </div>
      <div class="card__content">
        <p>{{ wishlist.description }}</p>
        <div class="d-flex items-center justify-between">
          <p>{{ wishlist.eventDate }}</p>
          <p>{{ wishlist.theme.name }}</p>
        </div>
      </div>
    </Card>
  </Link>
</template>

<style scoped lang="scss">
.card {
  height: 16.5rem;
  display: flex;
  flex-direction: column;

  h6 {
    padding: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-bottom: 2px solid var(--gray-800);
    border-top-left-radius: var(--rounded);
    border-top-right-radius: var(--rounded);
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

    & > p:first-child {
      font-size: var(--text-sm);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    & > div {
      font-size: var(--text-xs);
    }
  }
}
</style>
