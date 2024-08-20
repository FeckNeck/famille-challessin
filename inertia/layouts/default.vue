<script setup lang="ts">
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
</script>

<template>
  <div class="page-wrapper">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
