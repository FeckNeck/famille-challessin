<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3'
import { Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from '~/components/ui/button.vue'
import Collapsible from '~/components/ui/collapsible.vue'
import Input from '~/components/ui/input.vue'
import CreateGift from './create_gift.vue'
import Gift from './gift.vue'
import type { WishlistCategory } from '~/types'

const { category } = defineProps<{
  category: WishlistCategory
}>()

const form = useForm({
  name: category.name,
})

const isDeleting = ref<boolean>(false)

function submit() {
  if (form.processing) return

  form.put(`/wishlists/${category.wishlistId}/categories/${category.id}`, {
    preserveScroll: true,
  })
}

function remove() {
  if (isDeleting.value) return

  isDeleting.value = true

  router.delete(`/wishlists/${category.wishlistId}/categories/${category.id}`, {
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
        <form class="d-flex items-center g-4" @submit.prevent="submit()">
          <Input v-model:input="form.name" placeholder="Nom de la catégorie" />
          <Button
            :disabled="form.processing"
            :loading="form.processing"
            color="violet"
            size="small"
          >
            Modifier
          </Button>
        </form>
        <form class="d-flex items-center g-4" @submit.prevent="remove()">
          <Button :disabled="isDeleting" :loading="isDeleting" color="red" size="small">
            <Trash2 />
          </Button>
        </form>
      </div>
    </template>
    <template #content>
      <div class="category__content">
        <CreateGift :wishlist-id="category.wishlistId" :category-id="category.id" />
        <div v-auto-animate>
          <Gift
            v-for="gift in category.gifts"
            :key="gift.id"
            :gift="gift"
            :wishlist-id="category.wishlistId"
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
