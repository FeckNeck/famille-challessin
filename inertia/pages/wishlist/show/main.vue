<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Collapsible from '~/components/ui/collapsible.vue'
import Gift from './components/gift.vue'
import Hero from './components/hero.vue'
import Layout from '~/layouts/default.vue'
import type { Wishlist } from '~/app/types'

const wishlist = defineProps<Wishlist>()
</script>

<template>
  <Head title="Liste de souhaits" />
  <Layout>
    <div class="container">
      <div class="wishlist">
        <Hero :wishlist="wishlist" />
        <div class="d-flex column g-4">
          <Collapsible
            v-for="category in wishlist.categories"
            :key="category.id"
            class="wishlist__category"
          >
            <template #title>
              <h5>{{ category.name }}</h5>
            </template>
            <template #content>
              <Gift
                v-for="gift in category.gifts"
                :key="gift.id"
                :gift="gift"
                class="wishlist__category__gift"
              />
            </template>
          </Collapsible>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.wishlist {
  &__category {
    border: 2px solid var(--gray-800);
    box-shadow: var(--shadow-tiny);
    background-color: var(--white);
    display: flex;
    flex-direction: column;

    &__gift {
      border-bottom: 2px solid var(--gray-800);

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
