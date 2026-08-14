<script setup lang="ts">
  import HomeHero from '~/components/home/HomeHero.vue';

  const { data: page, error } = await useHomePage();

  if (error.value) {
    throw createError({
      statusCode: 500,
      statusMessage: '知识库内容暂时无法加载',
    });
  }
</script>

<template>
  <HomeHero v-if="page" :hero="page.hero" />
</template>
