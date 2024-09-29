<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { computed } from 'vue'
import Button from '~/components/ui/button.vue'
import Dialog from '~/components/ui/dialog.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import { useAuthDialog } from '~/composables/auth_dialog'

const { authDialogState, open, close } = useAuthDialog()

const isDialogOpen = computed(
  () => authDialogState.value.isOpen && authDialogState.value.mode === 'register'
)

const form = useForm({
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
})

function submit() {
  if (form.processing) return

  form.post('auth/register')
}

const btnText = computed(() => {
  return form.processing ? 'Processing...' : 'Créer le compte'
})
</script>

<template>
  <Dialog :open="isDialogOpen" @open-change="close()" position="top">
    <template #title>
      <div>
        <h4>S'inscrire</h4>
        <p>
          Vous avez déjà un compte ?
          <Button @click="open('login')" color="blank">Se connecter</Button>
        </p>
      </div>
    </template>
    <template #description>
      <form @submit.prevent="submit()" class="login">
        <p v-if="form.errors?.code === 'E_INVALID_CREDENTIALS'">
          No account found with the provided credentials
        </p>
        <div>
          <Field label="Email" :error="form.errors.email">
            <Input v-model="form.email" type="email" autocomplete="email" class="w-full" />
          </Field>
          <Field label="Nom de famille" :error="form.errors.username">
            <Input v-model="form.username" class="w-full" />
          </Field>
          <Field label="Mot de passe" :error="form.errors.password">
            <Input
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              class="w-full"
            />
          </Field>
          <Field label="Confirmer le mot de passe" :error="form.errors.password_confirmation">
            <Input
              v-model="form.password_confirmation"
              type="password"
              autocomplete="current-password"
              class="w-full"
            />
          </Field>
        </div>
        <Button
          :disabled="form.processing"
          color="yellow"
          size="small"
          class="w-full"
          type="submit"
        >
          {{ btnText }}
        </Button>
      </form>
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
