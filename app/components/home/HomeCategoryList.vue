<script setup lang="ts">
  import type { HomePageViewModel } from '@interface-adapters/view-models/home-page';

  defineProps<{
    categories: HomePageViewModel['categories'];
  }>();
</script>

<template>
  <div class="category-grid">
    <article v-for="(category, index) in categories" :key="category.id" class="category-card">
      <div class="card-index">0{{ index + 1 }}</div>
      <div class="category-icon" aria-hidden="true">↗</div>
      <h3>{{ category.name }}</h3>
      <p>{{ category.description }}</p>
      <span class="category-count">{{ category.countLabel }}</span>
    </article>
  </div>
</template>
