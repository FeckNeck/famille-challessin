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
  <div class="pagination" v-if="total">
    <button @click="handlePrevClick" :disabled="props.currentPage === 1" title="Page précédente">
      <ChevronLeft />
    </button>
    <span>{{ props.currentPage }} / {{ props.lastPage }}</span>
    <button
      @click="handleNextClick"
      :disabled="props.currentPage === props.lastPage"
      title="Page suivante"
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
