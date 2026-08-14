<script setup lang="ts">
  import Orb from '~/components/Orb/Orb.vue';
</script>

<template>
  <div class="home-orb" aria-hidden="true">
    <Orb :hue="18" :hover-intensity="0.24" :background-color="'#f7f8fb'" />
  </div>
</template>
