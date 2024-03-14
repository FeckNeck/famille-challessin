<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import Layout from '~/layouts/default.vue'
import modal from './modal.vue'

defineProps<{ version: number }>()
</script>

<template>
  <Head title="Homepage" />
  <Layout>
    <div class="container">
      <div class="title">AdonisJS {{ version }} x Inertia x Vue.js</div>
      <Link href="/modal" as="button" type="button">Modal</Link>
      <span>
        Learn more about AdonisJS and Inertia.js by visiting the
        <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
      </span>
    </div>
    <modal />
  </Layout>
</template>
