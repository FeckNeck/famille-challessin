<script setup lang="ts">
import { useForm, usePage, Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import Button from '~/components/ui/button.vue'
import Dialog from '~/components/ui/dialog.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'

const page = usePage()
const isDialogOpen = ref<boolean>(page.url.includes('modal=register'))

const form = useForm({
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
})

function submit() {
  if (form.processing) return

  form.post('auth/register', {
    preserveScroll: true,
    onSuccess: () => {
      isDialogOpen.value = false
    },
  })
}
</script>

<template>
  <Head v-if="isDialogOpen" title="S'inscrire" />
  <Dialog :open="isDialogOpen" position="top">
    <template #title>
      <div>
        <h4>S'inscrire</h4>
        <p>
          Vous avez déjà un compte ?
          <Button href="auth/login" color="blank">Se connecter</Button>
        </p>
      </div>
    </template>
    <template #description>
      <form @submit.prevent="submit()">
        <p v-if="form.errors?.code === 'E_INVALID_CREDENTIALS'">
          Aucun compte n'a été trouvé avec les informations d'identification fournies.
        </p>
        <div>
          <Field label="Email" :error="form.errors.email">
            <Input v-model:input="form.email" type="email" autocomplete="email" class="w-full" />
          </Field>
          <Field label="Nom de famille" :error="form.errors.username">
            <Input v-model:input="form.username" class="w-full" />
          </Field>
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
        </div>
        <Button
          :disabled="form.processing"
          :loading="form.processing"
          color="yellow"
          size="small"
          class="w-full"
          type="submit"
        >
          Créer le compte
        </Button>
      </form>
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
