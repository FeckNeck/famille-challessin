<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useForm, usePage } from '@inertiajs/vue3'
import Button from '~/components/ui/button.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import type { Gift, User } from '~/types'

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
</script>

<template>
  <div class="gift">
    <img :src="gift.image" :alt="gift.title + 'image'" />
    <div class="gift__content" v-if="!isBooking">
      <Button :href="gift.link" color="blank">{{ gift.title }}</Button>
      <p class="gift__content-description">{{ gift.description }}</p>
      <p>{{ gift.price }} €</p>
      <p v-if="gift.isReserved">
        Réservé par
        <span class="gift__content-gifter">{{ gift.giverName }}</span>
      </p>
      <Button v-else @click="isBooking = true" size="small" color="yellow">Reserver</Button>
    </div>
    <div v-else class="gift__form">
      <Button @click="isBooking = false" color="blank">
        <div class="d-flex items-center g-2">
          <ArrowLeft :size="16" />
          <span>Annuler</span>
        </div>
      </Button>
      <form @submit.prevent="submit()" class="w-full d-flex items-center g-4" id="patch-gift">
        <Field label="Nom" class="w-full" :error="form.errors.giverName">
          <Input v-model="form.giverName" type="text" class="gift__form-input" />
        </Field>
        <Field label="Email" class="w-full">
          <Input v-model="form.giverEmail" type="email" class="gift__form-input" />
        </Field>
      </form>
      <Button type="submit" size="small" color="yellow" form="patch-gift">Confirmer</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gift {
  display: flex;
  flex-direction: row;
  padding: 2rem 3rem;
  gap: 2rem;

  & > img {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;

    &-description {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &-gifter {
      font-weight: bold;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;

    &-input {
      width: 20rem;
    }
  }

  @media (max-width: 1024px) {
    &__form-input {
      width: 15rem;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1rem;

    &__content {
      align-items: center;
    }

    &__form {
      width: 100%;
      align-items: stretch;

      & > form {
        flex-direction: column;
        text-align: start;
      }

      &-input {
        width: 100%;
      }
    }
  }
}
</style>
