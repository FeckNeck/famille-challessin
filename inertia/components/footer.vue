<script setup lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="container">
      <div class="d-flex items-center justify-between py-6">
        <p>&copy; {{ currentYear }} FeckNeck</p>
        <div class="d-flex items-center g-4">
          <!-- TODO: find something to put here, maybe a gif or something -->
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  footer {
    background-color: var(--yellow-200);
    border-top: 2px solid var(--gray-800);
    margin-top: calc(38 * var(--space));
    padding-block: 1rem;
  }
</style>
