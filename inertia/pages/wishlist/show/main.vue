<script setup lang="ts">
import type { Wishlist } from '~/app/types'
import Layout from '~/layouts/default.vue'
import Hero from './components/hero.vue'
import Collapsible from '~/components/ui/collapsible.vue'
import Gift from './components/gift.vue'

const wishlist = defineProps<Wishlist>()
</script>

<template>
  <Layout>
    <div class="container">
      <div class="wishlist">
        <Hero :wishlist="wishlist" />
        <div class="d-flex column g-4">
          <div
            v-for="category in wishlist.categories"
            :key="category.id"
            :category="category"
            class="wishlist__category"
          >
            <Collapsible :title="category.name">
              <div class="d-flex column">
                <Gift
                  v-for="gift in category.gifts"
                  :key="gift.id"
                  :gift="gift"
                  class="wishlist__category__gift"
                />
              </div>
            </Collapsible>
          </div>
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

    &__gift {
      border-bottom: 2px solid var(--gray-800);

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
