<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'

const wishListForm = useForm({
  title: '',
  description: '',
  eventDate: '',
  file: null,
})
</script>

<template>
  <Layout>
    <div class="container">
      <h1>Create a new wishlist</h1>
      {{ wishListForm.errors }}
      <form @submit.prevent="wishListForm.post('/wishlists')">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" v-model="wishListForm.title" />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            v-model="wishListForm.description"
          ></textarea>
        </div>
        <div>
          <label for="event_date">Event Date</label>
          <input type="date" id="event_date" name="event_date" v-model="wishListForm.eventDate" />
        </div>
        <div>
          <label for="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            @input="wishListForm.file = $event.target?.files[0]"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  </Layout>
</template>

<style scoped lang="scss"></style>
