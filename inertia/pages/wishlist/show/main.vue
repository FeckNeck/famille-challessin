<script setup lang="ts">
  import { Head, router } from '@inertiajs/vue3';
  import type { Data } from '@generated/data';

  import Gift from './components/gift.vue';
  import Hero from './components/hero.vue';
  import Layout from '~/layouts/default.vue';
  import Collapsible from '~/components/ui/collapsible.vue';
  import { useDocumentVisibility } from '@vueuse/core';
  import { watch } from 'vue';

  const props = defineProps<{
    wishlist: Data.Wishlists.Wishlist;
  }>();

  const documentVisibility = useDocumentVisibility();

  watch(documentVisibility, (newVisibility) => {
    if (newVisibility === 'visible') {
      router.reload();
    }
  });
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
            class="wishlist__category">
            <template #title>
              <h5>{{ category.name }}</h5>
            </template>
            <template #content>
              <Gift
                v-for="gift in category.gifts"
                :key="gift.id"
                :gift="gift"
                :wishlistId="wishlist.id"
                :categoryId="category.id"
                class="wishlist__category__gift" />
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
