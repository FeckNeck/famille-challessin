<script setup lang="ts">
import { router, Link, useForm } from '@inertiajs/vue3'
import type { AuthForm } from '~/app/types'
import Layout from '~/layouts/default.vue'

const form = useForm<AuthForm>({
  email: '',
  password: '',
})
</script>

<template>
  <Layout>
    <h1>Login</h1>
    <div class="container">
      <p>Don't have an account? <Link href="/register">Register</Link></p>
      <form @submit.prevent="form.post('/login')">
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" name="password" />
        </div>
        <div>
          <button type="submit">Sign In</button>
          <a href="#"> Forgot Password? </a>
        </div>
      </form>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
