<script setup lang="ts">
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-vue-next'
const orderModel = defineModel<'asc' | 'desc'>('order')
</script>

<template>
  <button
    :aria-label="orderModel === 'asc' ? 'Sort by descending order' : 'Sort by ascending order'"
    @click="orderModel = orderModel === 'asc' ? 'desc' : 'asc'"
  >
    <ArrowDownNarrowWide v-if="order === 'asc'" :size="18" />
    <ArrowDownWideNarrow v-else :size="18" />
  </button>
</template>

<style scoped>
button {
  background: var(--white);
  border: 2px solid var(--gray-800);
  border-right: none;
  border-top-left-radius: var(--rounded);
  border-bottom-left-radius: var(--rounded);
  cursor: pointer;
  display: flex;
  padding: 0.5rem 0.75rem;
  align-items: center;
  justify-content: center;
}
</style>
