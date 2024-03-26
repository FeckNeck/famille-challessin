<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { Gift } from '../../../../app/types'
import { usePage } from '@inertiajs/vue3'

const props = defineProps<{
  gift: Gift
}>()

const page = usePage()
const user = computed(() => page.props.user)
const isBooking = ref<boolean>(false)
</script>

<template>
  <div class="gift">
    <img :src="gift.image" :alt="gift.title + 'image'" />
    <div v-if="!isBooking">
      <p>{{ gift.title }}</p>
      <p>{{ gift.description }}</p>
      <p>{{ gift.price }}</p>
      <p v-if="gift.isReserved">{{ gift.giverName }}</p>
      <button v-else @click="isBooking = true">Reserver le cadeau</button>
    </div>
    <div v-else>
      <input type="text" v-model="gift.giverName" />
      <button @click="isBooking = false">Annuler</button>
      <button @click="isBooking = false">Reserver</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gift {
  display: flex;
  align-items: center;
  gap: 2rem;

  & img {
    width: 10rem;
    height: 10rem;
    border-radius: 0.25rem;
  }
}
</style>
