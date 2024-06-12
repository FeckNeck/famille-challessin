<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Gift, User } from '~/types'
import { useForm, usePage } from '@inertiajs/vue3'

const props = defineProps<{
  gift: Gift
}>()

const page = usePage()
const user = computed(() => page.props.user as User)
const isBooking = ref<boolean>(false)

const form = useForm({
  giverId: user.value?.id ?? '',
  giverName: user.value?.username ?? '',
  giverEmail: user.value?.email ?? '',
  isReserved: true,
})

function submit() {
  form.patch(`/gifts/${props.gift.id}`, {
    preserveState: true,
    preserveScroll: true,
    onSuccess: () => {
      isBooking.value = false
      form.reset()
    },
  })
}

function cancelBooking() {
  form.giverEmail = ''
  form.giverName = ''
  form.giverId = ''
  form.isReserved = false
  submit()
}
</script>

<template>
  <div class="gift">
    <img :src="gift.image" :alt="gift.title + 'image'" />
    <div v-if="!isBooking">
      <p>{{ gift.title }}</p>
      <p>{{ gift.description }}</p>
      <p>{{ gift.price }}</p>
      <p v-if="user?.id === gift.giverId">
        Vous, <button @click="cancelBooking()">annuler</button>
      </p>
      <p v-else-if="gift.isReserved">Réservé par {{ gift.giverName }}</p>
      <button v-else @click="isBooking = true">Reserver le cadeau</button>
    </div>
    <div v-else>
      <p>Reserver le cadeau</p>
      <button @click="isBooking = false">Annuler</button>
      <form @submit.prevent="submit()">
        <label for="giverName">Votre nom</label>
        <input v-model="form.giverName" type="text" placeholder="Votre nom" />
        <label for="giverEmail">Votre email</label>
        <input v-model="form.giverEmail" type="email" placeholder="Votre email" />
        <button type="submit">Confirmer</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gift {
  display: flex;
  align-items: center;
  gap: 2rem;

  & img {
    width: 10rem;
    height: 10rem;
    border-radius: 0.25rem;
  }
}
</style>
