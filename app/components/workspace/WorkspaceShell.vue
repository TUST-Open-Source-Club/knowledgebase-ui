<script setup lang="ts">
  import type { Component } from 'vue';
  import { Bookmark, Clock3, House, Plus, Sparkles } from '@lucide/vue';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
  } from '~/components/ui/sidebar';
  import { workspaceNavigation } from '~/components/workspace/navigation';

  const iconMap: Record<string, Component> = {
    Bookmark,
    Clock3,
    House,
  };
</script>

<template>
  <SidebarProvider class="workspace-provider" :default-open="true">
    <Sidebar class="workspace-sidebar">
      <SidebarHeader class="workspace-sidebar-header">
        <NuxtLink class="workspace-brand" to="/">
          <span
            class="workspace-brand-mark"
            role="img"
            aria-label="开源协会知识库图标"
            style="background-image: url('/icon/favicon.svg')"
          />
          <span>开源协会知识库</span>
        </NuxtLink>
        <p>天津科技大学开放原子开源协会</p>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>我的空间</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in workspaceNavigation" :key="item.label">
              <SidebarMenuButton as-child :is-active="item.label === '知识空间'">
                <NuxtLink :to="item.href">
                  <component :is="iconMap[item.icon]" :size="17" :stroke-width="1.8" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div class="workspace-sidebar-note">
          <Sparkles :size="16" :stroke-width="1.7" aria-hidden="true" />
          <span>把想法整理成可以传承的脉络。</span>
        </div>
      </SidebarFooter>
    </Sidebar>

    <SidebarInset class="workspace-inset">
      <header class="workspace-toolbar">
        <div class="workspace-toolbar-title">
          <SidebarTrigger aria-label="展开或收起侧边栏" />
          <span>知识工作台</span>
        </div>
        <NuxtLink class="workspace-back" to="/">返回首页</NuxtLink>
      </header>

      <main class="workspace-main">
        <section id="spaces" class="workspace-empty" aria-labelledby="workspace-title">
          <div class="workspace-empty-icon">
            <House :size="24" :stroke-width="1.6" aria-hidden="true" />
          </div>
          <p class="workspace-kicker">知识空间</p>
          <h1 id="workspace-title">从一个空间开始整理知识</h1>
          <p class="workspace-description">
            将团队经验、实践方法与共同记忆，放进一条清晰、可继续生长的脉络。
          </p>
          <button class="workspace-primary" type="button">
            <Plus :size="17" :stroke-width="1.8" aria-hidden="true" />
            创建知识空间
          </button>
        </section>

        <section id="saved" class="workspace-quiet-section" aria-label="收藏内容">
          <span>收藏内容</span>
          <p>值得反复回看的内容，会在这里有序聚拢。</p>
        </section>

        <section id="recent" class="workspace-quiet-section" aria-label="最近访问">
          <span>最近访问</span>
          <p>从上一次停留的地方，继续你的阅读与整理。</p>
        </section>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
