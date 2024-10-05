<script setup lang="ts">
import { ref } from 'vue'
import { router, useForm, usePage } from '@inertiajs/vue3'
import Button from '~/components/ui/button.vue'
import Dialog from '~/components/ui/dialog.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import { useUrlSearchParams } from '@vueuse/core'

const page = usePage()
const isDialogOpen = ref<boolean>(page.url.includes('modal=reset-password'))
const params = useUrlSearchParams('history')

const form = useForm({
  password: '',
  password_confirmation: '',
  token: params.token as string,
})

function submit() {
  if (form.processing) return

  form.post('/auth/reset-password', {
    preserveScroll: true,
    onSuccess: () => {
      isDialogOpen.value = false
      router.visit('/auth/login', { preserveScroll: true })
    },
  })
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen" position="top">
    <template #title>
      <h4>Réinitialiser le mot de passe</h4>
    </template>
    <template #description>
      <form @submit.prevent="submit()">
        <input type="hidden" :value="form.token" />
        <Field label="Mot de passe" :error="form.errors.password">
          <Input
            v-model:input="form.password"
            type="password"
            autocomplete="current-password"
            class="w-full"
          />
        </Field>
        <Field label="Confirmer le mot de passe" :error="form.errors.password_confirmation">
          <Input
            v-model:input="form.password_confirmation"
            type="password"
            autocomplete="current-password"
            class="w-full"
          />
        </Field>
        <Button
          :disabled="form.processing"
          :loading="form.processing"
          color="yellow"
          size="small"
          class="w-full"
          type="submit"
        >
          Réinitialiser le mot de passe
        </Button>
      </form>
    </template>
  </Dialog>
</template>

<style scoped></style>
