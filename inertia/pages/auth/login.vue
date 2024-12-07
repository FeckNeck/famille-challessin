<script setup lang="ts">
import { ref } from 'vue'
import { Link, router, useForm, usePage, Head } from '@inertiajs/vue3'
import Button from '~/components/ui/button.vue'
import Checkbox from '~/components/ui/checkbox.vue'
import Dialog from '~/components/ui/dialog.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'

const page = usePage()
const isDialogOpen = ref<boolean>(page.url.includes('modal=login'))

const form = useForm({
  email: '',
  password: '',
  remember_me: false,
})

function submit() {
  if (form.processing) return

  form.post('/auth/login', {
    preserveScroll: true,
    onError: () => {
      form.reset('password')
    },
    onSuccess: () => {
      isDialogOpen.value = false
      // reload the page to get the authenticated user
      setTimeout(() => router.visit('/', { preserveScroll: true }), 200)
    },
  })
}
</script>

<template>
  <Head v-if="isDialogOpen" title="S'identifier" />
  <Dialog v-model:open="isDialogOpen" position="top">
    <template #title>
      <div>
        <h4>S'identifier</h4>
        <!-- TODO: Add Account Creation in V2.0 -->
        <!-- <p>Pas de compte ? <Button href="/auth/register" color="blank">Créer un compte</Button></p> -->
      </div>
    </template>
    <template #description>
      <form @submit.prevent="submit()" class="login">
        <p v-if="form.errors?.code === 'E_INVALID_CREDENTIALS'">
          Aucun compte n'a été trouvé avec les informations d'identification fournies.
        </p>
        <div>
          <Field label="Email" :error="form.errors.email">
            <Input v-model:input="form.email" type="email" autocomplete="email" class="w-full" />
          </Field>
          <Field label="Password" :error="form.errors.password">
            <Input
              v-model:input="form.password"
              type="password"
              autocomplete="current-password"
              class="w-full"
            />
          </Field>
          <div class="d-flex items-center justify-between">
            <Checkbox label="Se souvenir de moi" v-model:checked="form.remember_me">
              Remember me
            </Checkbox>
            <Link href="/auth/forgot-password" class="login-forgot">Mot de passe oublié ?</Link>
          </div>
        </div>
        <Button
          :disabled="form.processing"
          :loading="form.processing"
          color="yellow"
          size="small"
          class="w-full"
          type="submit"
        >
          Se connecter
        </Button>
      </form>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-forgot {
    font-size: var(--text-sm);
    text-decoration: underline;
    color: var(--gray-600);
  }
}
</style>
