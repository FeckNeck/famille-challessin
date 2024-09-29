<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import Dialog from '~/components/ui/dialog.vue'
import { usePage } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import Button from '~/components/ui/button.vue'
import { computed } from 'vue'
import Checkbox from '~/components/ui/checkbox.vue'
import { SharedData } from '@adonisjs/inertia/types'

const page = usePage<SharedData>()
const errors = computed(() => page.props.errors)
const showLoginModal = ref<boolean>(page.url.includes('modal=login'))

const form = useForm({
  email: '',
  password: '',
  remember_me: false,
})

function submit() {
  if (form.processing) return

  form.post('/auth/login', {
    onError: () => {
      form.reset('password')
    },
  })
}

const btnText = computed(() => {
  return form.processing ? 'Processing...' : 'Se connecter'
})
</script>

<template>
  <Dialog v-model:open="showLoginModal" position="top">
    <template #title>
      <div>
        <h4>S'identifier</h4>
        <p>Pas de compte ? <Button href="/auth/register" color="blank">Créer un compte</Button></p>
      </div>
    </template>
    <template #description>
      <form @submit.prevent="submit()" class="login">
        <p v-if="form.errors?.code === 'E_INVALID_CREDENTIALS'">
          Aucun compte n'a été trouvé avec les informations d'identification fournies.
        </p>
        <div>
          <Field label="Email" :error="form.errors.email">
            <Input v-model="form.email" type="email" autocomplete="email" class="w-full" />
          </Field>
          <Field label="Password" :error="form.errors.password">
            <Input
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              class="w-full"
            />
          </Field>
          <Checkbox label="Se souvenir de moi" v-model:checked="form.remember_me">
            Remember me
          </Checkbox>
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

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
