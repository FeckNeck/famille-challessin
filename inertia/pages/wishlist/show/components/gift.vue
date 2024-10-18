<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useForm, usePage } from '@inertiajs/vue3'
import Button from '~/components/ui/button.vue'
import Field from '~/components/ui/field.vue'
import Input from '~/components/ui/input.vue'
import type { Gift, User } from '~/types'
import { SharedProps } from '@adonisjs/inertia/types'

const props = defineProps<{
  gift: Gift
  wishlistId: string
  categoryId: string
}>()

const page = usePage<SharedProps>()
const user = computed(() => page.props.user as User | undefined)

const isBooking = ref<boolean>(false)

const form = useForm({
  giverName: user.value?.username ?? '',
  giverEmail: user.value?.email ?? '',
})

function submit() {
  if (form.processing) return

  form.patch(
    `/wishlists/${props.wishlistId}/categories/${props.categoryId}/gifts/${props.gift.id}/book`,
    {
      preserveScroll: true,
      onSuccess: () => {
        isBooking.value = false
        form.reset()
      },
    }
  )
}
</script>

<template>
  <div class="gift">
    <img :src="gift.imageUrl" :alt="gift.title + 'image'" />
    <div class="gift__content" v-if="!isBooking">
      <Button :href="gift.url" color="blank">{{ gift.title }}</Button>
      <p class="gift__content-description">{{ gift.description }}</p>
      <p>{{ gift.price }} €</p>
      <p v-if="gift.giverName">
        Réservé par
        <span class="gift__content-gifter">{{ gift.giverName }}</span>
      </p>
      <Button v-else @click="isBooking = true" size="small" color="yellow">Reserver</Button>
    </div>
    <div v-else class="gift__book">
      <Button @click="isBooking = false" color="blank">
        <div class="d-flex items-center g-2">
          <ArrowLeft :size="16" />
          <span>Annuler</span>
        </div>
      </Button>
      <form @submit.prevent="submit()" class="d-flex column grow justify-between items-start">
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
