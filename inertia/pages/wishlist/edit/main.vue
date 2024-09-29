<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import Hero from './components/hero.vue'
import Layout from '~/layouts/default.vue'
import type { WishlistTheme, Wishlist } from '~/types'
import Input from '~/components/ui/input.vue'
import Field from '~/components/ui/field.vue'
import Button from '~/components/ui/button.vue'
import Collapsible from '~/components/ui/collapsible.vue'
import Gift from './components/gift.vue'
import Category from './components/category.vue'

const props = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()

const categoryForm = useForm({
  name: '',
})

const giftForm = useForm({
  url: '',
})

function submitCategory() {
  if (categoryForm.processing) return

  categoryForm.post(`/wishlists/${props.wishlist.id}/categories`, {
    preserveScroll: true,
    onSuccess: () => {
      categoryForm.name = ''
    },
  })
}

function submitGift() {
  if (giftForm.processing) return

  giftForm.post(`/gifts/scrap`, {
    preserveScroll: true,
  })
}
</script>

<template>
  <Layout>
    <div class="container">
      <div class="wishlist">
        <!-- Edit wishlist -->
        <Hero :themes="props.themes" :wishlist="props.wishlist" />

        <!-- Create category-->
        <form @submit.prevent="submitCategory()" class="d-flex items-center g-4 pt-4">
          <Field label="Ajouter une catégorie" :error="categoryForm.errors.name" class="grow">
            <Input v-model:input="categoryForm.name" placeholder="Nom de la catégorie" />
          </Field>
          <Button color="yellow" size="small">Ajouter</Button>
        </form>

        <!-- Categories -->
        <div class="d-flex column g-4" v-auto-animate>
          <Category
            v-for="category in props.wishlist.categories"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.wishlist {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
