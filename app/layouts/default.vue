<script setup lang="ts">
  import type { CardNavItem } from '~/components/CardNav/CardNav.vue';
  import CardNav from '~/components/CardNav/CardNav.vue';
  import SpecularButton from '~/components/SpecularButton/SpecularButton.vue';

  const router = useRouter();

  const cardNavItems: CardNavItem[] = [
    {
      label: '关于协会',
      textColor: '#ffffff',
      gradient: ['#B24E66', '#D1788C', '#E89DAE', '#F3C0B8', '#F0D590'],
      links: [
        { label: '示例', ariaLabel: '功能示例占位' },
        { label: '示例', ariaLabel: '功能示例占位' },
      ],
    },
    {
      label: '知识空间',
      textColor: '#ffffff',
      gradient: ['#3E2564', '#7B5E8E', '#B898A0', '#D4B896', '#E5C87B'],
      links: [
        { label: '进入工作台', href: '/workspace', ariaLabel: '进入知识工作台' },
        { label: '示例', ariaLabel: '功能示例占位' },
      ],
    },
    {
      label: '联系协会',
      textColor: '#3E2564',
      gradient: ['#C8B8DC', '#D4C8E4', '#E0D8EE', '#EAE4F4', '#F4F0FA'],
      links: [
        { label: '示例', ariaLabel: '功能示例占位' },
        { label: '示例', ariaLabel: '功能示例占位' },
      ],
    },
  ];

  const goToWorkspace = () => void router.push('/workspace');
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <CardNav
        class-name="site-card-nav"
        :logo="'/icon/favicon.svg'"
        logo-alt="开源协会知识库图标"
        :items="cardNavItems"
        base-color="#ffffff"
        menu-color="#171b25"
      >
        <template #brand>
          <NuxtLink class="card-nav-brand" to="/" aria-label="返回知识库首页">
            <span
              class="card-nav-brand-mark"
              role="img"
              aria-label="开源协会知识库图标"
              style="background-image: url('/icon/favicon.svg')"
            />
            <strong>开源协会知识库</strong>
          </NuxtLink>
        </template>

        <template #action>
          <div class="site-card-nav-action">
            <SpecularButton
              size="sm"
              :radius="12"
              tint="#171b25"
              :tint-opacity="1"
              text-color="#ffffff"
              line-color="#ffffff"
              base-color="#171b25"
              :auto-animate="true"
              aria-label="进入工作台"
              @click="goToWorkspace"
            >
              进入工作台
            </SpecularButton>
          </div>
        </template>
      </CardNav>
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
