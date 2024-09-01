<script setup lang="ts">
import { Gift } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'
import type { Wishlist } from '~/app/types'
import WishListCard from './wishlist_card.vue'

defineProps<{ wishlists: Wishlist[] }>()
</script>

<template>
  <section v-if="wishlists.length > 0" class="cards__list" v-auto-animate>
    <WishListCard v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist" />
  </section>
  <div v-else class="no-wishlists">
    <h5>Aucune liste de cadeaux trouvée !</h5>
    <p>Si vous souhaitez en créer une, cliquez sur le bouton ci-dessous.</p>
    <Button href="/wishlists/create" as="button" type="button" color="violet">
      <div class="d-flex items-center g-2">
        <span>Créer une liste</span>
        <Gift />
      </div>
    </Button>
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
  gap: 1rem;
  text-align: center;
  height: 24rem;
  width: 100%;
}
</style>
