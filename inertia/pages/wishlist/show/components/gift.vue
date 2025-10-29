<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ArrowLeft } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from '~/components/ui/button.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import { useCurrentUser } from '~/composables/use_current_user'
import type { Gift } from '~/types'

const { gift, wishlistId, categoryId } = defineProps<{
  gift: Gift
  wishlistId: string
  categoryId: string
}>()

const user = useCurrentUser()

const isBooking = ref<boolean>(false)

const form = useForm({
  giverName: user.value?.username ?? '',
  giverEmail: user.value?.email ?? '',
})

function submit() {
  if (form.processing) return

  form.patch(`/wishlists/${wishlistId}/categories/${categoryId}/gifts/${gift.id}/book`, {
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
    <a :href="gift.url" target="_blank">
      <img :src="gift.imageUrl" :alt="`${gift.title} image`" class="gift-image" />
    </a>
    <div v-if="!isBooking" class="gift__content">
      <a :href="gift.url" target="_blank" class="d-flex column g-4">
        <h6 class="gift__content-title">{{ gift.title }}</h6>
        <p class="gift__content-description">{{ gift.description }}</p>
        <p>{{ gift.price }} €</p>
      </a>
      <p v-if="gift.giverName">
        Réservé par
        <span class="gift__content-gifter">{{ gift.giverName }}</span>
      </p>
      <Button v-else size="small" color="yellow" @click="isBooking = true">Reserver</Button>
    </div>
    <div v-else class="gift__book">
      <Button color="blank" @click="isBooking = false">
        <div class="d-flex items-center g-2">
          <ArrowLeft :size="16" />
          <span>Annuler</span>
        </div>
      </Button>
      <form class="d-flex column grow justify-between items-start" @submit.prevent="submit()">
        <div class="gift__book__form">
          <Field label="Nom" class="gift__book__form-field" :error="form.errors.giverName">
            <Input v-model:input="form.giverName" type="text" />
          </Field>
          <Field label="Email" class="gift__book__form-field">
            <Input v-model:input="form.giverEmail" type="email" />
          </Field>
        </div>
        <Button
          :disabled="form.processing"
          :loading="form.processing"
          type="submit"
          size="small"
          color="yellow"
        >
          Envoyer
        </Button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gift {
  display: flex;
  flex-direction: row;
  padding: 2rem 3rem;
  gap: 2rem;

  &-image {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    max-width: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;

    &-link {
      font-weight: bold;
    }

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

  &__book {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 1rem;

    &__form {
      display: flex;
      gap: 1rem;

      &-field {
        width: 20rem;
      }
    }
  }

  @media (max-width: 1024px) {
    &__book__form-field {
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

    &__book {
      width: 100%;
      align-items: stretch;

      &__form {
        text-align: start;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;

        &-field {
          width: 100%;
        }
      }

      button:last-child {
        width: 100%;
      }
    }
  }
}
</style>
