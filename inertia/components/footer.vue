<script setup lang="ts">
import { Github, Linkedin } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="container">
      <div class="d-flex items-center justify-between py-6">
        <p>&copy; {{ currentYear }} FeckNeck</p>
        <div class="d-flex items-center g-4">
          <a
            href="https://www.linkedin.com/in/mathis-dousse/"
            target="_blank"
            title="LinkedIn"
            rel="noopener noreferrer"
          >
            <Linkedin :size="20" />
          </a>
          <a
            href="https://github.com/FeckNeck"
            target="_blank"
            title="GitHub"
            rel="noopener noreferrer"
          >
            <Github :size="20" />
          </a>
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
