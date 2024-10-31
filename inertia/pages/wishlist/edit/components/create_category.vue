<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import Button from '~/components/ui/button.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'

const props = defineProps<{
  wishlistId: string
}>()

const form = useForm({
  name: '',
})

function submit() {
  if (form.processing) return

  form.post(`/wishlists/${props.wishlistId}/categories`, {
    preserveScroll: true,
    onSuccess: () => {
      form.name = ''
    },
  })
}
</script>

<template>
  <form @submit.prevent="submit()" class="d-flex items-center g-4 pt-4">
    <Field label="Ajouter une catégorie" :error="form.errors.name" class="grow">
      <Input v-model:input="form.name" placeholder="Nom de la catégorie" />
    </Field>
    <Button color="yellow" size="small" :disabled="form.processing" :loading="form.processing">
      Ajouter
    </Button>
  </form>
</template>

<style scoped></style>
