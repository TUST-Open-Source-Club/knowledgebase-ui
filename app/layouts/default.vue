<script setup lang="ts">
  import type { CardNavItem } from '~/components/CardNav/CardNav.vue';
  import CardNav from '~/components/CardNav/CardNav.vue';
  import SpecularButton from '~/components/SpecularButton/SpecularButton.vue';

  const router = useRouter();

  const cardNavItems: CardNavItem[] = [
    {
      label: '关于协会',
      bgColor: '#0a100b',
      textColor: '#f5f7f3',
      links: [
        { label: '协会简介', href: '#about', ariaLabel: '查看协会简介' },
        { label: '活动与成员', href: '#community', ariaLabel: '查看活动与成员' },
      ],
    },
    {
      label: '知识空间',
      bgColor: '#132b16',
      textColor: '#f5f7f3',
      links: [
        { label: '知识目录', href: '/workspace', ariaLabel: '进入知识目录' },
        { label: '实践记录', href: '/workspace', ariaLabel: '查看实践记录' },
      ],
    },
    {
      label: '联系协会',
      bgColor: '#203c25',
      textColor: '#f5f7f3',
      links: [
        { label: '加入协会', href: '#join', ariaLabel: '了解加入协会方式' },
        { label: '联系我们', href: '#contact', ariaLabel: '查看联系方式' },
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
