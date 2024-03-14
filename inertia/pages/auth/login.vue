<script setup lang="ts">
import { router, Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import Layout from '~/layouts/default.vue'

interface AuthForm {
  email: string
  username?: string
  password: string
}

const form = ref<AuthForm>({
  email: '',
  password: '',
})

function submit() {
  router.post('/login', form.value)
}
</script>

<template>
  <Layout>
    <h1>Login</h1>
    <div class="container">
      <p>Don't have an account? <Link href="/register">Register</Link></p>
      <form @submit.prevent="submit">
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
