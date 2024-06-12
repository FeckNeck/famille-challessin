<script lang="ts" setup>
import { Link, usePage, router } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage()
const user: any = computed(() => page.props.user)
</script>

<template>
  <header>
    <nav class="container">
      <ul class="d-flex items-center justify-between">
        <li>
          <Link href="/">Home</Link>
        </li>
        <template v-if="user">
          <li>
            <Link href="/account">{{ user.email }}</Link>
          </li>
          <li>
            <form @submit.prevent="router.delete('/logout')">
              <button type="submit">Logout</button>
            </form>
          </li>
        </template>
        <template v-else>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/auth/register">Register</Link>
          </li>
        </template>
        <li>
          <Link href="/wishlists">Wishlist</Link>
        </li>
        <li>
          <Link href="/wishlists/create">Create Wishlist</Link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss"></style>
