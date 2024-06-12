<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'

const form = useForm({
  email: '',
  password: '',
})

function submit() {
  if (form.processing) return

  form.post('login', {
    onError: () => {
      form.reset('password')
    },
  })
}
</script>

<template>
  <Layout>
    <h1>Login</h1>
    <div class="container">
      <p>Don't have an account? <Link href="/auth/register">Register</Link></p>
      <p v-if="form.errors?.code === 'E_INVALID_CREDENTIALS'">
        No account found with the provided credentials
      </p>
      <form @submit.prevent="submit()">
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" name="email" required />
          <small>{{ form.errors.email }}</small>
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" name="password" required />
          <small>{{ form.errors.password }}</small>
        </div>
        <div v-if="form.processing">
          <button disabled>Processing...</button>
        </div>
        <div v-else>
          <button type="submit">Sign In</button>
          <a href="#"> Forgot Password? </a>
        </div>
      </form>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
