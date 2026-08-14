# Knowledgebase Homepage and Workspace Implementation Plan

> 当前实现已按最新范围收缩：两个路由只保留占位页面和公共顶部导航；首页不渲染 Dock，Dock 和 Orb 源文件已移除。下方原宣传首屏与工作台方案暂不执行。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页重做为浅色宣传首屏，并增加只展示信息架构的工作台占位页。

**Architecture:** `/` 只组合 Hero、Orb 和底部 Dock，不渲染 Sidebar；`/workspace` 使用 shadcn Sidebar 和 Lucide 图标展示未来工作台边界。现有 Clean Architecture 数据链只为首页 Hero 提供标题和说明，所有 UI 依赖留在 `app/` 与生成组件目录。

**Tech Stack:** Nuxt 4、Vue 3、TypeScript、shadcn-vue 组件、Vue Bits Dock/Orb、`@lucide/vue`、GSAP、pnpm。

---

## 文件地图

- Create: `components.json` — shadcn-vue CLI 的组件输出和别名配置。
- Create: `app/components/ui/*` — shadcn/Vue Bits 生成组件；只保留 CLI 所需的库约定文件。
- Create: `app/lib/utils.ts` — shadcn 组件共用的 class 合并函数。
- Create: `app/components/navigation/HomeDock.vue` — 首页 Dock 的链接包装。
- Create: `app/components/visual/HomeOrb.vue` — 首页 Orb 的展示包装。
- Create: `app/components/workspace/WorkspaceShell.vue` — 工作台 Sidebar 和空状态组合。
- Create: `app/components/workspace/navigation.ts` — 工作台导航项的静态配置。
- Create: `app/pages/workspace.vue` — `/workspace` 占位路由。
- Create: `tests/unit/workspace-navigation.test.ts` — 验证工作台导航配置的公开行为。
- Modify: `app/pages/index.vue` — 只保留宣传首页组合。
- Modify: `app/layouts/default.vue` — 公共 head、品牌、footer 署名和页面壳层。
- Modify: `app/components/home/HomeHero.vue` — 重做宣传 Hero，移除英文 eyebrow。
- Modify: `app/assets/styles/main.css` — 浅色设计系统、首页/工作台布局和响应式样式。
- Modify: `nuxt.config.ts` — favicon head、字体 provider 和本地字体设置。
- Modify: `package.json`、`pnpm-lock.yaml` — shadcn、Lucide 和 GSAP 依赖。
- Modify: `docs/guides/development-workflow.md` — 补充首页/工作台验证入口。

## Task 1: 安装组件基础和停止远程字体请求

**Files:** `package.json`, `pnpm-lock.yaml`, `components.json`, `app/lib/utils.ts`, `nuxt.config.ts`, `public/icon/favicon.svg`

- [ ] **Step 1: 建立 shadcn-vue 配置并安装 Sidebar 依赖**

运行：

```bash
pnpm dlx shadcn-vue@latest init
pnpm add @lucide/vue gsap clsx tailwind-merge class-variance-authority
```

配置输出目录为 `app/components/ui`，工具别名为 `~/lib/utils`，样式继续使用 `app/assets/styles/main.css`。若 CLI 已检测到现有配置，只补齐缺失字段，不改用 npm/yarn。

- [ ] **Step 2: 安装工作台 Sidebar**

运行：

```bash
pnpm dlx shadcn-vue@latest add sidebar
```

预期：生成 Sidebar、SidebarProvider、SidebarContent 等组件，且组件只依赖 `app/lib/utils.ts` 与 Lucide 生态。

- [ ] **Step 3: 安装指定 Vue Bits 组件**

按用户指定命令执行：

```bash
pnpm dlx shadcn@latest add https://vue-bits.dev/r/dock.json
pnpm dlx shadcn@latest add https://vue-bits.dev/r/orb.json
```

如果网站 registry URL 返回 HTML，使用 Vue Bits 官方仓库的 raw registry：

```bash
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/DavidHDev/vue-bits/main/public/r/Dock.json
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/DavidHDev/vue-bits/main/public/r/Orb.json
```

原计划使用上述官方 raw registry；当前范围已收缩，Dock、Orb 及其首页包装源文件已移除。

如果 CLI 对 Vue registry 组件要求 `shadcn-vue` 入口，则使用等价的 Vue CLI 入口并保留相同 registry URL；不手写替代组件覆盖生成文件。

- [ ] **Step 4: 禁用远程字体 provider**

在 `nuxt.config.ts` 使用：

```ts
fonts: {
  providers: {
    google: false,
    googleicons: false,
  },
},
```

使用 `icon: { provider: 'none' }`，Lucide 直接作为 Vue 组件导入；全局 CSS 使用本地优先字体栈，页面不通过 `@import` 或 `<link>` 请求 Google Fonts。

- [ ] **Step 5: 配置 favicon**

在 Nuxt `app.head.link` 中声明：

```ts
{ rel: 'icon', type: 'image/svg+xml', href: '/icon/favicon.svg' }
```

品牌图片直接使用 `/icon/favicon.svg`，不复制 SVG 内容，不生成第二份 logo 资产。

- [ ] **Step 6: 验证基础配置并提交**

运行：

```bash
pnpm exec nuxt prepare
git diff --check
git status --short
```

确认 `components.json`、生成组件和锁文件存在，且未修改 `.learnings/` 内容。提交：

```bash
git add components.json app/components/ui app/lib/utils.ts nuxt.config.ts package.json pnpm-lock.yaml
git diff --cached --check
git commit -m "chore(ui): 配置首页组件基础"
```

## Task 2: 用 TDD 固定工作台导航边界

**Files:** `tests/unit/workspace-navigation.test.ts`, `app/components/workspace/navigation.ts`

- [ ] **Step 1: 写失败测试**

先创建测试，要求公开导航配置包含三个稳定入口和对应图标名称：

```ts
import { describe, expect, it } from 'vitest';
import { workspaceNavigation } from '~/components/workspace/navigation';

describe('workspaceNavigation', () => {
  it('provides stable workspace entries without homepage-only decoration', () => {
    expect(workspaceNavigation.map((item) => item.label)).toEqual(['知识空间', '收藏内容', '最近访问']);
    expect(workspaceNavigation.every((item) => item.icon.length > 0)).toBe(true);
  });
});
```

- [ ] **Step 2: 确认 RED**

运行：`pnpm test -- tests/unit/workspace-navigation.test.ts`

预期：因为 `app/components/workspace/navigation.ts` 尚不存在而失败。

- [ ] **Step 3: 写最小配置实现**

创建：

```ts
export type WorkspaceNavigationItem = Readonly<{
  label: string;
  icon: string;
}>;

export const workspaceNavigation: readonly WorkspaceNavigationItem[] = [
  { label: '知识空间', icon: 'House' },
  { label: '收藏内容', icon: 'Bookmark' },
  { label: '最近访问', icon: 'Clock3' },
];
```

- [ ] **Step 4: 确认 GREEN 并提交**

运行：`pnpm test -- tests/unit/workspace-navigation.test.ts`

预期：新增测试通过。提交：

```bash
git add tests/unit/workspace-navigation.test.ts app/components/workspace/navigation.ts
git diff --cached --check
git commit -m "test(workspace): 固定工作台导航边界"
```

## Task 3: 重做宣传首屏

**Files:** `app/pages/index.vue`, `app/components/home/HomeHero.vue`, `app/components/navigation/HomeDock.vue`, `app/components/visual/HomeOrb.vue`, `app/layouts/default.vue`, `app/assets/styles/main.css`

- [ ] **Step 1: 页面只组合 Hero**

`app/pages/index.vue` 保留 `useHomePage()`，只把 `page.hero` 传给 `HomeHero`；删除分类和最近文档区的 import 与模板，不删除领域/应用示例链路。

- [ ] **Step 2: 创建 HomeDock 包装**

包装生成的 Dock，传入首页和工作台两个链接；Dock 位于页面底部居中，使用 Lucide 图标或生成组件自身的图标 API，职责只包含导航展示。

- [ ] **Step 3: 创建 HomeOrb 包装**

包装生成的 Orb，使用 `aria-hidden="true"` 的视觉层，不向组件传入业务统计；Orb 在桌面端位于 Hero 右侧，移动端缩小并放到文案下方。

- [ ] **Step 4: 重写 HomeHero**

组件只渲染：中文标题、中文说明、进入工作台按钮、HomeOrb 和 HomeDock。移除 `OPEN KNOWLEDGE COMMUNITY`、环形标签和开发态信息。标题使用 `clamp(3rem, 7vw, 6.5rem)` 与宽容器，桌面端不超过两行。

- [ ] **Step 5: 更新公共布局**

顶部显示 favicon 图片和“开源协会知识库”；底部左侧显示“天津科技大学开放原子开源协会”。首页不出现 Sidebar。`/workspace` 通过页面自身引入工作台壳层。

- [ ] **Step 6: 添加轻量 GSAP 动效**

在客户端挂载后对 Hero 文案执行一次 `fromTo` 入场，对 Orb 容器执行低幅度循环 `y` 和 `rotate`；组件卸载时销毁 timeline，避免页面热更新重复动画。

- [ ] **Step 7: 验证首页结构并提交**

运行：

```bash
pnpm run lint:check
pnpm typecheck
git diff --check
```

确认首页源码不包含 `Sidebar`、英文 eyebrow 和分类/最近列表渲染。提交：

```bash
git add app/pages/index.vue app/components/home/HomeHero.vue app/components/navigation/HomeDock.vue app/components/visual/HomeOrb.vue app/layouts/default.vue app/assets/styles/main.css public/icon/favicon.svg
git diff --cached --check
git commit -m "feat(home): 重做宣传首屏"
```

## Task 4: 增加工作台占位页

**Files:** `app/pages/workspace.vue`, `app/components/workspace/WorkspaceShell.vue`, `app/assets/styles/main.css`

- [ ] **Step 1: 创建工作台壳层**

使用 shadcn `SidebarProvider` 和 `Sidebar`，通过 `workspaceNavigation` 渲染导航项，并使用 `@lucide/vue` 的 `House`、`Bookmark`、`Clock3` 组件。Sidebar 只属于 `/workspace`。

- [ ] **Step 2: 创建正式空状态**

主区域展示“工作台”和“从一个空间开始整理知识”，提供返回首页和创建空间两个视觉按钮；按钮可以保持无业务动作，但不能显示开发中、待实现或示例代码等开发态文字。

- [ ] **Step 3: 创建路由入口**

`app/pages/workspace.vue` 只渲染 `WorkspaceShell`，不创建仓储，不读取页面业务数据。

- [ ] **Step 4: 验证工作台边界并提交**

运行：

```bash
pnpm test
pnpm run lint:check
pnpm typecheck
git diff --check
```

确认 `/workspace` 有 Sidebar，`/` 没有 Sidebar。提交：

```bash
git add app/pages/workspace.vue app/components/workspace/WorkspaceShell.vue app/assets/styles/main.css tests/unit/workspace-navigation.test.ts
git diff --cached --check
git commit -m "feat(workspace): 添加工作台占位页"
```

## Task 5: 全量验证和文档同步

**Files:** `docs/guides/development-workflow.md`, all changed files

- [ ] **Step 1: 更新开发流程入口**

补充首页入口 `/` 和工作台占位入口 `/workspace`，说明首页不承载 Sidebar，Sidebar 属于工作台页面；保留现有 lint、typecheck、test、build 和 hooks 规则。

- [ ] **Step 2: 运行全量检查**

运行：

```bash
pnpm run lint:check
pnpm typecheck
pnpm test
pnpm build
```

预期：全部退出码为 `0`。构建日志中不出现 `Could not fetch from https://fonts.google.com` 或 `googleicons` provider 初始化失败。

- [ ] **Step 3: 浏览器检查**

启动：`pnpm dev --host 127.0.0.1`

检查：

1. `/` 为浅色宣传首屏，使用 favicon 图标、Orb 和底部 Dock。
2. `/` 不显示 Sidebar，标题上方没有英文。
3. `/workspace` 显示 shadcn Sidebar 和 Lucide 图标。
4. 390×844 视口没有横向溢出。
5. 控制台没有运行时错误。

- [ ] **Step 4: 检查差异并提交文档**

运行：`git diff --check` 和 `git status --short`，确认只包含本次首页/工作台任务文件。提交：

```bash
git add docs/guides/development-workflow.md
git diff --cached --check
git commit -m "docs(home): 补充首页与工作台入口"
```

## 最终验收清单

- [ ] `/` 是纯展示性浅色首屏，无 Sidebar、英文 eyebrow、分类列表和最近文档列表。
- [ ] `/workspace` 有 shadcn Sidebar 和 Lucide 图标，但不实现真实业务。
- [ ] Dock 位于首页底部，Orb 位于首页 Hero 视觉区域。
- [ ] favicon 和品牌图标均来自 `public/icon/favicon.svg`。
- [ ] 左下角署名为“天津科技大学开放原子开源协会”，品牌名为“开源协会知识库”。
- [ ] 构建不访问 Google Fonts/Material Symbols 远程 provider。
- [ ] `pnpm run lint:check`、`pnpm typecheck`、`pnpm test`、`pnpm build` 全部通过。
