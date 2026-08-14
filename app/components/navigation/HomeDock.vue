<script setup lang="ts">
  import { BookOpen, LayoutDashboard } from '@lucide/vue';
  import { h } from 'vue';
  import Dock, { type DockItemData } from '~/components/Dock/Dock.vue';

  const router = useRouter();

  const items: DockItemData[] = [
    {
      icon: h(BookOpen, { size: 19, strokeWidth: 1.7 }),
      label: '知识库首页',
      onClick: () => void router.push('/'),
    },
    {
      icon: h(LayoutDashboard, { size: 19, strokeWidth: 1.7 }),
      label: '进入工作台',
      onClick: () => void router.push('/workspace'),
    },
  ];
</script>

<template>
  <div class="home-dock-frame">
    <Dock
      :items="items"
      class-name="home-dock-panel"
      :base-item-size="46"
      :magnification="62"
      :panel-height="58"
      :dock-height="96"
    />
  </div>
</template>
