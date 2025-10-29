<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { total, lastPage, currentPage } = defineProps<{
  total: number
  lastPage: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

function handleNextClick() {
  if (currentPage < lastPage) emit('update', currentPage + 1)
}

function handlePrevClick() {
  if (currentPage > 1) emit('update', currentPage - 1)
}
</script>

<template>
  <div v-if="total" class="pagination">
    <button :disabled="currentPage === 1" title="Page précédente" @click="handlePrevClick">
      <ChevronLeft />
    </button>
    <span>{{ currentPage }} / {{ lastPage }}</span>
    <button :disabled="currentPage === lastPage" title="Page suivante" @click="handleNextClick">
      <ChevronRight />
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin-inline: auto;
  display: flex;
  gap: 1rem;
  align-items: center;

  button {
    cursor: pointer;
    padding: 0.25rem;
    border: 2px solid var(--gray-800);
    border-radius: 0.25rem;
    background-color: var(--white);
  }

  button:disabled {
    cursor: not-allowed;
    color: var(--gray-300);
  }
}
</style>
