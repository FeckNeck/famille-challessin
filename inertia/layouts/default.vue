<script setup lang="ts">
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import Login from '~/pages/auth/login.vue'
import Register from '~/pages/auth/register.vue'
</script>

<template>
  <div class="page-wrapper">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
  <Login />
  <Register />
</template>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
