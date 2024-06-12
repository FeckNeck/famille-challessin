<script setup lang="ts">
import { defineProps } from 'vue'
import type { Wishlist } from '~/app/types'
import WishListCard from './wishlist_card.vue'
import { Link } from '@inertiajs/vue3'

defineProps<{ wishlists: Wishlist[] }>()
</script>

<template>
  <section v-if="wishlists.length > 0" class="cards__list" v-auto-animate>
    <WishListCard v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist" />
  </section>
  <div v-else class="no-wishlists">
    <p>Aucune liste de cadeaux trouvée !</p>
    <p>Si vous souhaitez en créer une, cliquez sur le bouton ci-dessous.</p>
    <Link href="/wishlists/create" as="button" type="button">Créer une liste</Link>
  </div>
</template>

<style scoped lang="scss">
.cards__list {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.no-wishlists {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 24rem;
  width: 100%;
}
</style>
