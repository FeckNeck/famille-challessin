<script setup lang="ts">
import { Gift } from 'lucide-vue-next'
import Button from '../../../components/ui/button.vue'
</script>

<template>
  <div class="relative py-24 mb-14">
    <div class="container">
      <div class="hero">
        <div class="hero__title">
          <h1>
            Listes de souhaits <br />
            de la famille <span>challessin</span>
          </h1>
          <Button color="yellow" href="#">
            <div class="d-flex items-center g-2">
              <span>Créer une liste</span>
              <Gift />
            </div>
          </Button>
        </div>
        <img src="https://placehold.co/600x400" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  &__title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h1 {
      color: var(--gray-800);
      font-size: var(--text-h1);
      font-weight: normal;
      line-height: 64px;

      span {
        position: relative;
        display: inline-block;

        &:before {
          background-color: var(--red-300);
          content: '';
          height: 95%;
          margin-left: -2.5%;
          position: absolute;
          transform: rotate(-2deg);
          transition: transform 300ms ease-in-out;
          width: 105%;
          will-change: transform;
          z-index: -1;
        }

        &:hover:before {
          transform: rotate(0deg);
        }
      }
    }
  }
}
</style>
