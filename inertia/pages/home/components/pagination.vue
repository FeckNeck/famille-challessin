<script setup lang="ts">
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
  <div class="pagination">
    <button @click="handlePrevClick" :disabled="props.currentPage === 1">Prev</button>
    <span>{{ props.currentPage }} / {{ props.lastPage }}</span>
    <button @click="handleNextClick" :disabled="props.currentPage === props.lastPage">Next</button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin-inline: auto;

  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: white;
  }

  span {
    margin-inline: 1rem;
  }

  button:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
}
</style>
