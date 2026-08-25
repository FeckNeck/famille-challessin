<script setup lang="ts">
  const inputModel = defineModel<string>('input', { required: true });
</script>

<template>
  <div class="relative">
    <textarea ref="textarea" v-bind="$attrs" v-model="inputModel" />
    <span v-if="$attrs.maxlength">{{ inputModel.length }} / {{ $attrs.maxlength }}</span>
  </div>
</template>

<style scoped lang="scss">
  textarea {
    -ms-overflow-style: none;
    background-color: var(--white);
    border: 2px solid var(--gray-800);
    field-sizing: content;
    max-height: 150px;
    outline: none;
    padding: 0.5rem;
    resize: none;
    scrollbar-width: none;
    width: 100%;

    &:focus {
      box-shadow: var(--shadow-tiny);
    }

    &::placeholder {
      color: var(--gray-500);
    }
  }

  textarea::-webkit-scrollbar {
    display: none;
  }

  span {
    font-size: var(--text-xs);
    color: var(--gray-600);
    position: absolute;
    right: 0;
    bottom: -1rem;
  }
</style>
