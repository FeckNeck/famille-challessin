<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import Dialog from '~/components/ui/dialog.vue'
import { usePage } from '@inertiajs/vue3'
import { onUpdated, ref } from 'vue'
import Button from '~/components/ui/button.vue'
import { computed } from 'vue'

const page = usePage()
const showLoginModal = ref<boolean>(page.url.includes('modal=login'))

// onUpdated(() => {
//   showLoginModal.value = page.url.includes('modal=login')
// })

const form = useForm({
  email: '',
  password: '',
})

function submit() {
  if (form.processing) return

  form.post('auth/login', {
    onError: () => {
      form.reset('password')
    },
  })
}

const btnText = computed(() => {
  return form.processing ? 'Processing...' : 'Sign In'
})
</script>

<template>
  <Dialog position="top" v-model:open="showLoginModal">
    <template #title>
      <div>
        <h4>S'identifier</h4>
        <p>Pas de compte ? <Button href="/auth/register" color="blank">Créer un compte</Button></p>
      </div>
    </template>
    <template #description>
      <form @submit.prevent="submit()" class="login">
        <p v-if="form.errors?.code === 'E_INVALID_CREDENTIALS'">
          No account found with the provided credentials
        </p>
        <Field label="Email" :error="form.errors.email">
          <Input v-model:input="form.email" type="email" autocomplete="email" class="w-full" />
        </Field>
        <div>
          <Field label="Password" :error="form.errors.password">
            <Input
              v-model:input="form.password"
              type="password"
              autocomplete="current-password"
              class="w-full"
            />
          </Field>
        </div>
        <div>
          <Button
            :disabled="form.processing"
            color="yellow"
            size="small"
            class="w-full"
            type="submit"
          >
            {{ btnText }}
          </Button>
        </div>
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
