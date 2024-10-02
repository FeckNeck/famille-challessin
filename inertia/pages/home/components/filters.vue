<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { User, WishlistTheme } from '~/app/types'

defineProps<{ themes: WishlistTheme[]; users: User[] }>()

/**
 * Workaround to works with the Select component
 */
const usernameModel = defineModel<string[] | string>('username', {
  get: (value) => value[0],
  set: (value) => [value],
})
const themeModel = defineModel<string | null>('theme')
</script>

<template>
  <div class="filters">
    <div>
      <h4>Themes</h4>
      <div class="filters__btns">
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="themeModel = themeModel === theme.name ? null : theme.name"
        >
          <div :class="{ '--active': theme.name === themeModel }">
            <Icon :icon="theme.icon" :ssr="true" />
          </div>
          <div>
            <p>{{ theme.name }}</p>
            <p>{{ theme.count }} listes</p>
          </div>
        </button>
      </div>
    </div>
    <div>
      <h4>Familles</h4>
      <div class="filters__btns">
        <button
          v-for="user in users"
          :key="user.id"
          @click="usernameModel = usernameModel === user.username ? '' : user.username"
        >
          <div :class="{ '--active': usernameModel === user.username }">
            <Icon icon="lucide:cat" :ssr="true" />
          </div>
          <div>
            <p>{{ user.username }}</p>
            <p>{{ user.count }} listes</p>
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
      background: none;
      border: none;
      transition: transform 0.2s ease-in-out;

      div:first-child {
        padding: 0.5rem;
        border-radius: var(--rounded-sm);
        background-color: var(--white);
        border: 2px solid var(--gray-800);
        transition: background-color 0.5s;

        &.--active {
          background-color: var(--violet-600);
        }
      }

      &:hover {
        transform: translateX(0.5rem);

        div:first-child {
          background-color: var(--violet-600);
        }
      }

      p:last-child {
        font-size: var(--text-sm);
      }
    }
  }
}
</style>
