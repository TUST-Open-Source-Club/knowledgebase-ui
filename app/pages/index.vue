<script setup lang="ts">
  import HomeCategoryList from '~/components/home/HomeCategoryList.vue';
  import HomeDocumentList from '~/components/home/HomeDocumentList.vue';
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
  <div v-if="page" class="home-page">
    <HomeHero :hero="page.hero" :document-total="page.documentTotal" />

    <section id="categories" class="content-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">EXPLORE THE SPACE</span>
          <h2>从感兴趣的地方开始</h2>
        </div>
        <p>把分散的经验放回清晰的脉络，找到可以继续深入的方向。</p>
      </div>
      <HomeCategoryList :categories="page.categories" />
    </section>

    <section id="recent" class="content-section recent-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">RECENTLY UPDATED</span>
          <h2>最近沉淀的内容</h2>
        </div>
        <a class="text-link" href="#recent">查看全部 <span aria-hidden="true">↗</span></a>
      </div>
      <HomeDocumentList :documents="page.documents" />
    </section>
  </div>
</template>
