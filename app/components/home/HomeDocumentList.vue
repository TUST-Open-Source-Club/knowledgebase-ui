<script setup lang="ts">
  import type { HomePageViewModel } from '@interface-adapters/view-models/home-page';

  defineProps<{
    documents: HomePageViewModel['documents'];
  }>();
</script>

<template>
  <div class="document-list">
    <article v-for="document in documents" :key="document.id" class="document-row">
      <div class="document-marker" aria-hidden="true" />
      <div class="document-copy">
        <span class="document-category">{{ document.category }}</span>
        <h3>{{ document.title }}</h3>
        <p>{{ document.summary }}</p>
      </div>
      <time class="document-date" :datetime="document.updatedAtLabel.replaceAll('.', '-')">
        {{ document.updatedAtLabel }}
      </time>
      <span class="document-arrow" aria-hidden="true">↗</span>
    </article>
  </div>
</template>
