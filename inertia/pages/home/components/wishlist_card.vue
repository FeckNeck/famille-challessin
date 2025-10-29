<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'
import Card from '~/components/ui/card.vue'
import { useCurrentUser } from '~/composables/use_current_user'
import type { Wishlist } from '~/app/types'

const { wishlist } = defineProps<{ wishlist: Wishlist }>()

const user = useCurrentUser()

const wishlistLink = computed(() =>
  wishlist.user.id === user.value?.id ? `${wishlist.id}/edit` : wishlist.slug
)

const backgroundColor = computed(() => {
  return {
    backgroundColor: wishlist.user.color,
  }
})

const eventDate = useDateFormat(() => wishlist.eventDate, 'D MMM YYYY', {
  locales: 'fr-FR',
})
</script>

<template>
  <Link :href="`/wishlists/${wishlistLink}`" class="card">
    <Card>
      <div>
        <h6 :style="backgroundColor">{{ wishlist.title }}</h6>
        <div class="card__header__image">
          <img :src="wishlist.imageUrl" :alt="`${wishlist.title}image`" />
        </div>
      </div>
      <div class="card__content">
        <p class="card__content__description">{{ wishlist.description }}</p>
        <div class="d-flex items-center justify-between">
          <p class="card__content__event-date">{{ eventDate }}</p>
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

  &:hover {
    background-color: var(--yellow-100);
    transition: background-color 200ms ease-in-out;
  }

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

    &__description {
      font-size: var(--text-sm);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    & > div {
      font-size: var(--text-xs);
      line-height: 1rem;
    }

    &__event-date {
      position: relative;

      &:before {
        background-color: var(--yellow-500);
        content: '';
        height: 7px;
        bottom: 0;
        margin-left: -2.5%;
        position: absolute;
        width: 105%;
        z-index: -1;
      }
    }
  }
}
</style>
