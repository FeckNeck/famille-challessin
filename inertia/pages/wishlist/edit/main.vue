<script setup lang="ts">
import { ref, watch } from 'vue'
import { useForm } from '@inertiajs/vue3'
import Accordion from '~/components/ui/accordion.vue'
import category from './components/category.vue'
import Editable from '~/components/ui/editable.vue'
import Hero from './components/hero.vue'
import Layout from '~/layouts/default.vue'
import type { WishlistTheme, Wishlist } from '~/types'
import Input from '~/components/ui/input.vue'
import { Menu, Search } from 'lucide-vue-next'

const props = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()

const categoryForm = useForm({
  name: '',
  wishlistId: props.wishlist.id,
})

const giftForm = useForm({
  url: '',
})

function submitCategory() {
  if (categoryForm.processing) return

  categoryForm.post(`/wishlists/${props.wishlist.id}/categories`, {
    preserveScroll: true,
  })
}

function submitGift() {
  if (giftForm.processing) return

  giftForm.post(`/gifts/scrap`, {
    preserveScroll: true,
  })
}

// const input = ref<string>('ceci est un input')

// // Watch the input model for changes
// watch(input, (value) => {
//   console.log(value)
// })

const title = ref<string>('XD')

// watch(title, (value) => {
//   console.log(value)
// })
</script>

<template>
  <Layout>
    <div class="container">
      <Input v-model:input="title" label="Title">
        <Menu :size="12" />
      </Input>
      <!-- Edit wishlist -->
      <Hero :themes="props.themes" :wishlist="props.wishlist" />

      <!-- Create category-->
      <form @submit.prevent="submitCategory()">
        <div>
          <label for="category">Category</label>
          <input type="text" id="category" name="category" v-model="categoryForm.name" />
        </div>
        <div>
          <button disabled v-if="categoryForm.processing">Processing...</button>
          <button type="submit" v-else>Envoyer</button>
        </div>
      </form>

      <div>
        <ul>
          <category
            v-for="category in wishlist.categories"
            :key="category.id"
            :category="category"
          />
        </ul>

        <!-- Scrap Gift -->
        <form @submit.prevent="submitGift()">
          <div>
            <label for="url">Gift URL</label>
            <input type="text" id="url" name="url" v-model="giftForm.url" />
          </div>
          <div>
            <button disabled v-if="giftForm.processing">Processing...</button>
            <button type="submit" v-else>Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
