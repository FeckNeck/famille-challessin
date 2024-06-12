<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'

import { WishlistTheme, Wishlist } from '~/types'

const props = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()

const form = useForm({
  title: props.wishlist.title ?? '',
  description: props.wishlist.description ?? '',
  eventDate: props.wishlist.eventDate ?? '',
  themeId: props.wishlist.theme.id ?? null,
  file: '',
})

function submit() {
  form.post('/wishlists', {
    preserveScroll: true,
    preserveState: true,
  })
}
</script>

<template>
  <Layout>
    <div class="container">
      <h1>Create a new wishlist</h1>
      <form @submit.prevent="submit">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" v-model="form.title" />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea id="description" name="description" v-model="form.description"></textarea>
        </div>
        <div>
          <label for="event_date">Event Date</label>
          <input type="date" id="event_date" name="event_date" v-model="form.eventDate" />
        </div>
        <div>
          <label for="theme">Theme</label>
          <select id="theme" name="theme" v-model="form.themeId">
            <option v-for="theme in themes" :value="theme.id">{{ theme.name }}</option>
          </select>
        </div>
        <div>
          <label for="image">Image</label>
          <input type="file" id="image" name="image" @input="form.file = $event.target?.files[0]" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
