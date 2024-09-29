<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import Button from '~/components/ui/button.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'

const props = defineProps<{
  wishlistId: string
  categoryId: string
}>()

const form = useForm({
  url: '',
})

function create() {
  if (form.processing) return

  form.post(`/wishlists/${props.wishlistId}/categories/${props.categoryId}/gifts/`, {
    preserveScroll: true,
  })
}
</script>

<template>
  <form @submit.prevent="create()" class="d-flex items-center g-4 p-4">
    <Field label="Ajouter un cadeau" :error="form.errors.url" class="grow">
      <Input
        v-model:input="form.url"
        placeholder="https://www.flashjouet.fr/accueil/3119-zuru-pets-alive-bonnie-le-lama-4894680009653.html"
      />
    </Field>
    <Button color="yellow" size="small">Ajouter</Button>
  </form>
</template>

<style scoped></style>
