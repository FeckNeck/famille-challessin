<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import type { WishlistCategory } from '~/types'
import Gift from './gift.vue'
import Collapsible from '~/components/ui/collapsible.vue'

const isDeleting = ref<boolean>(false)

const props = defineProps<{
  category: WishlistCategory
}>()

const form = useForm({
  id: props.category.id,
  name: props.category.name,
  wishlistId: props.category.wishlistId,
})

function edit() {
  if (form.processing) return

  form.put(`/wishlists/${props.category.wishlistId}/categories/${props.category.id}`, {
    preserveScroll: true,
  })
}

function destroy() {
  if (isDeleting.value) return

  isDeleting.value = true

  router.delete(`/wishlists/${props.category.wishlistId}/categories/${props.category.id}`, {
    preserveScroll: true,
    onFinish: () => {
      isDeleting.value = false
    },
  })
}
</script>

<template>
  <!-- <div class="d-flex">
    <form @submit.prevent="edit()">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" type="text" />
      <button disabled v-if="form.processing || isDeleting">Processing...</button>
      <button type="submit" v-else>Envoyer</button>
    </form>
    <button @click="destroy" v-if="!isDeleting">X</button>
  </div> -->
  <Collapsible :title="category.name">
    <div class="stack">
      <gift v-for="gift in category.gifts" :key="gift.id" :gift="gift" />
    </div>
  </Collapsible>
</template>

<style scoped></style>
