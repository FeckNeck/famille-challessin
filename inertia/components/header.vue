<script lang="ts" setup>
import { Link, usePage, router } from '@inertiajs/vue3'
import { computed } from 'vue'
import Button from '~/components/ui/button.vue'
import { User } from '~/types'

const page = usePage()
const user = computed(() => page.props.user as User)
</script>

<template>
  <header>
    <div class="w-full d-flex items-center justify-between py-4 container">
      <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage">
        <img src="../assets/icons/logo_saint-vulbas.svg" alt="" />
      </Link>

      <div class="d-flex items-center g-2">
        <template v-if="user">
          <Link href="/account">{{ user.username }}</Link>
          <span> | </span>
          <form @submit.prevent="router.delete('/logout')">
            <Button type="submit" color="yellow" size="small">Se déconnecter</Button>
          </form>
        </template>
        <template v-else>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);

  & img {
    width: 3rem;
    height: 3rem;
  }
}
</style>
