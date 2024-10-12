<script lang="ts" setup>
import { computed } from 'vue'
import { Link, usePage, router } from '@inertiajs/vue3'
import { SharedData } from '@adonisjs/inertia/types'
import { User } from '~/types'
import { UserRound } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'

const page = usePage<SharedData>()
const user = computed(() => page.props.user as User)

function logout() {
  router.delete('/logout', {
    preserveScroll: true,
    onSuccess: () => {
      router.visit('/', { preserveScroll: true })
    },
  })
}
</script>

<template>
  <header>
    <div class="w-full d-flex items-center justify-between py-4 container">
      <Link href="/" :preserve-scroll="true" :preserve-state="true" aria-label="Homepage">
        <img src="../assets/icons/logo_saint-vulbas.svg" alt="Logo du village de Saint Vulbas" />
      </Link>

      <div class="d-flex items-center g-2">
        <template v-if="user">
          <Link href="/account">{{ user.username }}</Link>
          <span> | </span>
          <form @submit.prevent="logout()">
            <Button type="submit" color="yellow" size="small">Se déconnecter</Button>
          </form>
        </template>
        <template v-else>
          <Button href="/auth/login" size="small" color="yellow">
            <div class="d-flex items-center g-2">
              <UserRound :size="16" :stroke-width="3" />
              <span>Connexion</span>
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
  z-index: 100;
  backdrop-filter: blur(8px);

  & img {
    width: 4rem;
  }
}
</style>
