<script setup lang="ts">
  import Login from '~/pages/auth/login.vue';
  import Header from '~/components/header.vue';
  import Footer from '~/components/footer.vue';
  import Register from '~/pages/auth/register.vue';
  import ResetPassword from '~/pages/auth/reset_password.vue';
  import ForgotPassword from '~/pages/auth/forgot_password.vue';
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
  <ForgotPassword />
  <ResetPassword />
</template>

<style scoped lang="scss">
  .page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
