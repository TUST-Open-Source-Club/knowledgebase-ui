<script setup lang="ts">
  import type { HomePageViewModel } from '@interface-adapters/view-models/home-page';

  defineProps<{
    hero: HomePageViewModel['hero'];
    documentTotal: number;
  }>();
</script>

<template>
  <section class="hero-section">
    <div class="hero-copy">
      <span class="eyebrow">OPEN KNOWLEDGE COMMUNITY</span>
      <h1>{{ hero.title }}</h1>
      <p>{{ hero.description }}</p>
      <div class="hero-actions">
        <a class="primary-action" href="#recent">浏览最新内容 <span aria-hidden="true">↗</span></a>
        <a class="secondary-action" href="#categories">探索知识分类</a>
      </div>
    </div>

    <div class="hero-orbit" aria-hidden="true">
      <div class="orbit orbit-large" />
      <div class="orbit orbit-small" />
      <div class="orbit-core">
        <span>{{ documentTotal }}</span>
        <small>篇内容</small>
      </div>
      <span class="orbit-label orbit-label-top">SHARE</span>
      <span class="orbit-label orbit-label-right">GROW</span>
      <span class="orbit-label orbit-label-bottom">REUSE</span>
    </div>
  </section>
</template>
