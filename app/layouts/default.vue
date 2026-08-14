<template>
  <div class="site-shell">
    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="返回知识库首页">
        <img class="brand-mark" src="/icon/favicon.svg" alt="" />
        <span>
          <strong>开源协会知识库</strong>
        </span>
      </NuxtLink>

      <nav class="site-nav" aria-label="主导航">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/workspace">知识工作台</NuxtLink>
      </nav>

      <NuxtLink class="header-action" to="/workspace">进入工作台</NuxtLink>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <span>天津科技大学开放原子开源协会</span>
      <span>让知识在连接中持续生长</span>
    </footer>
  </div>
</template>
