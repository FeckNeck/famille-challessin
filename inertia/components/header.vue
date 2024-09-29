<script lang="ts" setup>
import { SharedData } from '@adonisjs/inertia/types'
import { Link, usePage, router } from '@inertiajs/vue3'
import { computed } from 'vue'
import Button from '~/components/ui/button.vue'
import { useAuthDialog } from '~/composables/auth_dialog'
import { User } from '~/types'

const page = usePage<SharedData>()
const user = computed(() => page.props.user as User)

const { open } = useAuthDialog()
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
          <Button @click="open('login')" size="small" color="yellow">
            <div class="d-flex items-center g-2">
              <UserRound :size="16" :stroke-width="3" />
              <span> Connexion </span>
            </div>
          </Button>
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
