<script setup lang="ts">
import type { Gift } from '~/types'
import { useForm } from '@inertiajs/vue3'
import Input from '~/components/ui/input.vue'

const props = defineProps<{
  gift: Gift
}>()

const form = useForm({
  id: props.gift.id,
  title: props.gift.title,
  description: props.gift.description,
  categoryId: props.gift.categoryId,
  price: props.gift.price,
  link: props.gift.link,
})
</script>

<template>
  <div class="gift">
    <img :src="gift.image" :alt="gift.title + ' image'" />
    <div class="gift-content">
      <!-- <Input v-model:input="form.title" label="Titre" /> -->
      <p>{{ gift.description }}</p>
      <p>{{ gift.price }}</p>
      <a :href="gift.link!">Lien</a>
    </div>
  </div>
</template>

<style scoped>
.gift {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
