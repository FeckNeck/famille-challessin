<script setup lang="ts">
interface Wishlists {
  id: number
  name: string
  image: string
}

const props = defineProps<{
  wishlists: Wishlists[]
}>()

function xd() {
  fetch('/' + props.wishlists[0].image)
    .then((res) => res.json())
    .then((data) => {
      console.log('data:', data)
    })
}
</script>

<template>
  <button @click="xd">xd</button>
  <img :src="wishlists[0].image" alt="img" />
</template>

<style scoped lang="scss"></style>
