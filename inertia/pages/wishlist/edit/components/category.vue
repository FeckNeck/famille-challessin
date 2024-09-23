<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import type { WishlistCategory } from '~/types'
import Gift from './gift.vue'
import Collapsible from '~/components/ui/collapsible.vue'
import Input from '~/components/ui/input.vue'
import Button from '~/components/ui/button.vue'
import { Trash2 } from 'lucide-vue-next'
import Field from '~/components/ui/field.vue'

const props = defineProps<{
  category: WishlistCategory
}>()

const form = useForm({
  name: props.category.name,
})

const giftForm = useForm({
  url: '',
})

const isDeleting = ref<boolean>(false)

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

function createGift() {
  if (giftForm.processing) return

  giftForm.post(`/wishlists/${props.category.wishlistId}/categories/${props.category.id}/gifts/`, {
    preserveScroll: true,
  })
}
</script>

<template>
  <Collapsible class="category">
    <template #title>
      <div class="d-flex items-center g-4">
        <form @submit.prevent="edit()" class="d-flex items-center g-4">
          <Input v-model:input="form.name" placeholder="Nom de la catégorie" />
          <Button color="violet" size="small">Modifier</Button>
        </form>
        <form @submit.prevent="destroy()" class="d-flex items-center g-4">
          <Button color="red" size="small">
            <Trash2 />
          </Button>
        </form>
      </div>
    </template>
    <template #content>
      <div class="category__content">
        <form @submit.prevent="createGift()" class="d-flex items-center g-4 p-4">
          <Field label="Ajouter un cadeau" :error="giftForm.errors.url" class="grow">
            <Input
              v-model:input="giftForm.url"
              placeholder="https://www.flashjouet.fr/accueil/3119-zuru-pets-alive-bonnie-le-lama-4894680009653.html"
            />
          </Field>
          <Button color="yellow" size="small">Ajouter</Button>
        </form>
        <Gift v-for="gift in category.gifts" :key="gift.id" :gift="gift" />
      </div>
    </template>
  </Collapsible>
</template>

<style scoped lang="scss">
.category {
  border: 2px solid var(--gray-800);
  box-shadow: var(--shadow-tiny);
  background-color: var(--white);

  &__content {
    & > *:not(:last-child) {
      border-bottom: 2px solid var(--gray-800);
    }
  }
}
</style>
