<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { useObjectUrl } from '@vueuse/core'
import { shallowRef } from 'vue'
import Layout from '~/layouts/default.vue'
import type { WishlistTheme, Wishlist } from '~/types'

const props = defineProps<{
  themes: WishlistTheme[]
  wishlist: Wishlist
}>()

const form = useForm({
  title: props.wishlist.title,
  description: props.wishlist.description,
  eventDate: '2024-07-11',
  themeId: props.wishlist.theme.id,
  image: props.wishlist.image,
  isPublic: props.wishlist.isPublic,
  categories: props.wishlist.categories,
})

const file = shallowRef()
const url = useObjectUrl(file)

function onFileChange(e: Event) {
  file.value = (e.target as HTMLInputElement).files![0]
}

function submit() {
  if (form.processing) return

  form.image = file.value
  form.put(`/wishlists/${props.wishlist.id}`, {
    preserveScroll: true,
    preserveState: true,
  })
}
</script>

<template>
  <Layout>
    <div class="container">
      {{ wishlist }}
      <div>
        <h1>Create a new wishlist</h1>
        {{ form.errors }}
        <form @submit.prevent="submit()">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" v-model="form.title" />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea v-model="form.description" id="description" name="description"></textarea>
          </div>
          <div>
            <label for="event_date">Event Date</label>
            <input type="date" id="event_date" name="event_date" v-model="form.eventDate" />
          </div>
          <div>
            <label for="theme">Theme</label>
            <select id="theme" name="theme" v-model="form.themeId">
              <option v-for="theme in themes" :value="theme.id">
                {{ theme.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="is_public">Public</label>
            <input type="checkbox" id="is_public" name="is_public" v-model="form.isPublic" />
          </div>
          <div>
            <label for="image">Image</label>
            <input type="file" id="image" name="image" @input="onFileChange($event)" />
          </div>
          <div>
            <button disabled v-if="form.processing">Processing...</button>
            <button type="submit" v-else>Envoyer</button>
          </div>
        </form>
        <img v-if="url" :src="url" alt="Image preview" />
      </div>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
