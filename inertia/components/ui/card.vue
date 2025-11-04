<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--white);
  border: 2px solid var(--gray-800);
  border-radius: var(--rounded);
  box-shadow: var(--shadow-small);
  color: var(--gray-800);
  padding: spacePx(8) spacePx(9);
  transition: all 200ms ease-in-out;
  will-change: box-shadow;
  isolation: isolate;

  &.clickable {
    cursor: pointer;
  }

  &:hover {
    transform: translateY(4px) translateX(4px);
    box-shadow: none;
  }

  time {
    display: inline-block;
    font-size: var(--text-xs);
    font-weight: normal;
    position: relative;

    &:before {
      background-color: var(--yellow-500);
      content: '';
      height: 6px;
      bottom: 5px;
      margin-left: -2.5%;
      position: absolute;
      width: 105%;
      z-index: -1;
    }
  }

  h2 {
    font-size: var(--text-h4);
    font-weight: normal;
    line-height: 36px;
  }

  p {
    font-size: var(--text-lg);
    line-height: 26px;
  }
}
</style>
