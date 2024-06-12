<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  type: string
  placeholder: string
}>()
</script>

<template>
  <input v-model="model" :type="type" :placeholder="placeholder" />
</template>

<style scoped></style>
