<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{ total: number; lastPage: number; currentPage: number }>()

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

function handleNextClick() {
  if (props.currentPage < props.lastPage) emit('update', props.currentPage + 1)
}

function handlePrevClick() {
  if (props.currentPage > 1) emit('update', props.currentPage - 1)
}
</script>

<template>
  <div v-if="total" class="pagination">
    <button :disabled="props.currentPage === 1" title="Page précédente" @click="handlePrevClick">
      <ChevronLeft />
    </button>
    <span>{{ props.currentPage }} / {{ props.lastPage }}</span>
    <button
      :disabled="props.currentPage === props.lastPage"
      title="Page suivante"
      @click="handleNextClick"
    >
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
