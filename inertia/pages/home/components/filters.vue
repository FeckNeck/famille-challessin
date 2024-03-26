<script setup lang="ts">
import { defineProps } from 'vue'
import type { User, WishlistTheme } from '~/app/types'

defineProps<{ themes: WishlistTheme[]; users: User[] }>()

const usernameModel = defineModel<string | null>('username')
const themeModel = defineModel<string | null>('theme')
</script>

<template>
  <div class="filters">
    <div>
      <p>Themes</p>
      <div class="filters__btns">
        <button
          v-for="theme in themes"
          :key="theme.id"
          :class="{ active: theme.name === themeModel }"
          @click="themeModel = themeModel === theme.name ? null : theme.name"
        >
          <span>{{ themeModel === theme.name }}</span>
          <div>
            <p>{{ theme.name }}</p>
            <p>{{ theme.count }} {{ themeModel }}</p>
          </div>
        </button>
      </div>
    </div>
    <div>
      <p>Familles</p>
      <div class="filters__btns">
        <button
          v-for="user in users"
          :key="user.id"
          :class="{ active: usernameModel === user.username }"
          @click="usernameModel = usernameModel === user.username ? null : user.username"
        >
          <span>{{ usernameModel === user.username }}</span>
          <div>
            <p>{{ user.username }}</p>
            <p>{{ user.count }} Listes</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: none;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    display: flex;
  }

  &__btns {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    gap: 1rem;

    button {
      display: flex;
      gap: 1rem;
      align-items: center;
      text-align: left;
    }
  }
}

.active {
  background-color: red;
}
</style>
