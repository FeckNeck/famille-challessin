<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { useObjectUrl } from '@vueuse/core'
import { shallowRef } from 'vue'
import Layout from '~/layouts/default.vue'
import { WishlistTheme } from '~/types'

defineProps<{
  themes: WishlistTheme[]
}>()

const wishListForm = useForm({
  title: '',
  description: '',
  eventDate: '',
  themeId: null,
  image: null,
})

const file = shallowRef()
const url = useObjectUrl(file)

function onFileChange(e: Event) {
  file.value = (e.target as HTMLInputElement).files![0]
}

function submit() {
  wishListForm.image = file.value
  wishListForm.post('/wishlists', {
    onSuccess: () => {
      wishListForm.reset()
    },
  })
}
</script>

<template>
  <Layout>
    <div class="container">
      <div>
        <h1>Create a new wishlist</h1>
        <form @submit.prevent="submit()">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" v-model="wishListForm.title" required />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea
              v-model="wishListForm.description"
              id="description"
              name="description"
              required
            ></textarea>
          </div>
          <div>
            <label for="event_date">Event Date</label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              v-model="wishListForm.eventDate"
              required
            />
          </div>
          <div>
            <label for="theme">Theme</label>
            <select id="theme" name="theme" v-model="wishListForm.themeId">
              <option v-for="theme in themes" :value="theme.id">{{ theme.name }}</option>
            </select>
          </div>
          <div>
            <label for="image">Image</label>
            <input type="file" id="image" name="image" @input="onFileChange($event)" required />
          </div>
          <button type="submit">Create</button>
        </form>
        <img v-if="url" :src="url" alt="Image preview" />
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
