<template>
  <div class="site-shell">
    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="返回知识库首页">
        <span class="brand-mark">A</span>
        <span>
          <strong>原子知识库</strong>
          <small>OPEN KNOWLEDGE</small>
        </span>
      </NuxtLink>

      <nav class="site-nav" aria-label="主导航">
        <NuxtLink to="/">知识空间</NuxtLink>
        <a href="#categories">知识分类</a>
        <a href="#recent">最近更新</a>
      </nav>

      <button class="header-action" type="button">进入空间</button>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <span>天津科技大学开放原子开源协会</span>
      <span>让每一次分享都成为下一次创造的起点</span>
    </footer>
  </div>
</template>
