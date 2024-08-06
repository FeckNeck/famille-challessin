<script setup lang="ts">
import type { Gift } from '~/types'
import { useForm } from '@inertiajs/vue3'

const props = defineProps<{
  gift: Gift
}>()

const form = useForm({
  id: props.gift.id,
  title: props.gift.title,
  description: props.gift.description,
  categoryId: props.gift.categoryId,
  price: props.gift.price,
  link: props.gift.link,
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
