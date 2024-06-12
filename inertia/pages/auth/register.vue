<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'

const form = useForm({
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
})

function submit() {
  if (form.processing) return

  form.post('register')
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1>Register</h1>
      <p>Already have an account? <Link href="/auth/login">Login</Link></p>
      {{ form.errors }}
      <form @submit.prevent="submit()">
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" name="email" />
        </div>
        <div>
          <label for="username">Username</label>
          <input v-model="form.username" type="text" id="username" name="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" name="password" />
        </div>
        <div>
          <label for="password_confirmation">Confirm Password</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
          />
        </div>
        <div>
          <button type="submit" :disabled="form.processing">Register</button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
