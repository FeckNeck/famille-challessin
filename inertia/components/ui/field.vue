<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  label?: string
  error?: any
  info?: string
}>()
</script>

<template>
  <div class="form_group">
    <label v-if="label" class="form_label">{{ label }}</label>
    <slot />
    <span v-if="info" class="form_info">{{ info }}</span>
    <span v-else-if="error" class="form_error">{{ error }}</span>
  </div>
</template>

<style scoped>
.form_group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
  padding-bottom: 1.25rem;
}

.form_label {
  color: var(--gray-800);
}

.form_control {
  border: 2px solid var(--gray-800);
  border-radius: var(--rounded);
  background: transparent;
  padding: 0.5rem 1rem;

  &[disabled] {
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--gray-600);
    font-weight: var(--text-bold);
  }
}

.form_group .form_error {
  color: var(--red-500);
  font-size: var(--text-sm);
  text-transform: uppercase;
  position: absolute;
  bottom: 0;
}

.form_group .form_help {
  color: var(--cyan-500);
  font-size: var(--text-sm);
  position: absolute;
  bottom: 0;
}
</style>
