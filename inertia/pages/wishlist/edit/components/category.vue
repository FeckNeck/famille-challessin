<script setup lang="ts">
import { ref } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import { Trash2 } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'
import Collapsible from '~/components/ui/collapsible.vue'
import CreateGift from './create_gift.vue'
import Gift from './gift.vue'
import Input from '~/components/ui/input.vue'
import type { WishlistCategory } from '~/types'

const props = defineProps<{
  category: WishlistCategory
}>()

const form = useForm({
  name: props.category.name,
})

const isDeleting = ref<boolean>(false)

function submit() {
  if (form.processing) return

  form.put(`/wishlists/${props.category.wishlistId}/categories/${props.category.id}`, {
    preserveScroll: true,
  })
}

function remove() {
  if (isDeleting.value) return

  isDeleting.value = true

  router.delete(`/wishlists/${props.category.wishlistId}/categories/${props.category.id}`, {
    preserveScroll: true,
    onFinish: () => {
      isDeleting.value = false
    },
  })
}
</script>

<template>
  <Collapsible class="category">
    <template #title>
      <div class="d-flex items-center g-4">
        <form @submit.prevent="submit()" class="d-flex items-center g-4">
          <Input v-model:input="form.name" placeholder="Nom de la catégorie" />
          <Button :disabled="form.processing" :loading="form.processing" color="violet" size="small"
            >Modifier</Button
          >
        </form>
        <form @submit.prevent="remove()" class="d-flex items-center g-4">
          <Button :disabled="isDeleting" :loading="isDeleting" color="red" size="small">
            <Trash2 />
          </Button>
        </form>
      </div>
    </template>
    <template #content>
      <div class="category__content">
        <CreateGift :wishlistId="props.category.wishlistId" :categoryId="props.category.id" />
        <div v-auto-animate>
          <Gift
            v-for="gift in category.gifts"
            :key="gift.id"
            :gift="gift"
            :wishlistId="category.wishlistId"
          />
        </div>
      </div>
    </template>
  </Collapsible>
</template>

<style scoped lang="scss">
.category {
  border: 2px solid var(--gray-800);
  box-shadow: var(--shadow-tiny);
  background-color: var(--white);

  &__content {
    & > div,
    & > div > :not(:last-child) {
      border-bottom: 2px solid var(--gray-800);
    }
  }
}
</style>
