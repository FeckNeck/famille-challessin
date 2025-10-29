<script setup lang="ts">
import { useForm, usePage, Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import Button from '~/components/ui/button.vue'
import Dialog from '~/components/ui/dialog.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import { usePageErrors } from '~/composables/use_page_errors'
import type { PageProps } from '@adonisjs/inertia/types'

const page = usePage<PageProps>()
const isDialogOpen = ref<boolean>(page.url.includes('modal=forgot-password'))
const errors = usePageErrors()

const form = useForm({
  email: '',
})

const isEmailSent = ref<boolean>(false)

function submit() {
  if (form.processing) return

  form.post('/auth/forgot-password', {
    preserveScroll: true,
    onSuccess: () => {
      isEmailSent.value = true
    },
  })
}
</script>

<template>
  <Head v-if="isDialogOpen" title="Mot de passe oublié" />
  <Dialog v-model:open="isDialogOpen" position="top">
    <template #title>
      <div>
        <h4>Mot de passe oublié</h4>
      </div>
    </template>
    <template #description>
      <div v-if="isEmailSent">
        <p>Un email de réinitialisation de mot de passe a été envoyé à l'adresse email fournie.</p>
        <Button color="yellow" size="small" class="w-full mt-4" @click="isDialogOpen = false">
          Fermer
        </Button>
      </div>
      <form v-else class="login" @submit.prevent="submit()">
        <p v-if="errors.E_INVALID_CREDENTIALS" class="pb-4">
          Aucun compte n'a été trouvé avec les informations d'identification fournies.
        </p>
        <div>
          <Field label="Email" :error="form.errors.email">
            <Input v-model:input="form.email" type="email" autocomplete="email" class="w-full" />
          </Field>
        </div>
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
