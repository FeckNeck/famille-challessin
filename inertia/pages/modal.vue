<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const showLoginModal = ref(page.url.includes('modal=modal'))

onUpdated(() => {
  showLoginModal.value = page.url.includes('modal=modal')
})

const form = ref({
  email: '',
  password: '',
})

function submit() {
  console.log(form.value)
  // router.post('/login', form.value)
}
</script>

<template>
  <div v-if="showLoginModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showLoginModal = false">&times;</span>
      <h2>Login</h2>
      <form @submit.prevent="submit">
        <div>
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password" name="password" />
        </div>
        <div>
          <button type="submit">Sign In</button>
          <a href="#"> Forgot Password? </a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
