<script setup lang="ts">
import { Gift } from 'lucide-vue-next'
import Button from '~/components/ui/button.vue'
</script>

<template>
  <div class="relative py-24 mb-14">
    <div class="hero">
      <div class="container">
        <div class="hero__content">
          <div class="hero__content__title">
            <h1>
              Listes de souhaits <br />
              de la famille <span>challessin</span>
            </h1>
            <Button color="yellow" href="wishlists/create">
              <div class="d-flex items-center g-2">
                <span>Créer une liste</span>
                <Gift />
              </div>
            </Button>
          </div>
          <model-viewer
            alt="AdonisJS 3d logo"
            class="hero__content__model-viewer"
            :class="{
              '--hidden': modelViewerScriptLoaded.value === false,
              '--visible': modelViewerScriptLoaded.value === true,
            }"
            auto-rotate
            disable-zoom
            interaction-prompt="none"
            orientation="0deg 0deg 0deg"
            auto-rotate-delay="400"
            rotation-per-second="30deg"
            disable-pan
            src="/saint-vulbas.glb"
            camera-controls
            touch-action="pan-y"
            camera-orbit="30.24deg 95.94deg 18.36m"
            field-of-view="30deg"
            shadow-intensity="0.6"
            shadow-softness="1"
            tone-mapping="commerce"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  &:before {
    position: absolute;
    z-index: 0;
    content: '';
    top: -15%;
    bottom: 0%;
    height: 130%;
    width: 100%;
    pointer-events: none;
    // background:
    //   url(@/assets/noise.webp) repeat,
    //   linear-gradient(83.21deg, var(--cyan-500) 0%, var(--violet-500) 100%);
    background: var(--violet-300);
    background-blend-mode: overlay;
    -webkit-mask-image: radial-gradient(rgba(0, 0, 0, 1), transparent 70%);
    mask-image: radial-gradient(rgba(0, 0, 0, 1), transparent 70%);
    opacity: 0.5;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 2rem;

    &__title {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;

      @media (min-width: 768px) {
        align-items: flex-start;
        text-align: left;
      }

      h1 {
        color: var(--gray-800);
        font-size: var(--text-h1);
        font-weight: normal;
        line-height: 64px;

        span {
          position: relative;
          display: inline-block;
          z-index: 1;

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

    &__model-viewer {
      display: block;
      height: 27.5rem;
      flex: 1;
      transition: opacity 4s ease-in-out;
      --progress-bar-color: transparent;

      &.--hidden {
        opacity: 0;
      }

      &.--visible {
        opacity: 1;
      }

      @media (max-width: 640px) {
        display: none;
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
}
</style>
