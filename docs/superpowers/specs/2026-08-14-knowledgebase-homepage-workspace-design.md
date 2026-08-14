# 知识库宣传首屏与工作台占位页设计

> 当前实现以最新范围为准：`/` 与 `/workspace` 仅保留占位内容和公共顶部导航；首页不渲染 Dock，Dock 和 Orb 源文件已移除。下方视觉方案暂不执行。

## 目标

将当前首页重做为类语雀知识库的纯展示性宣传首屏，同时增加一个不实现真实业务的工作台占位页。宣传首屏负责品牌、视觉和进入路径；工作台页面负责提前固定未来知识整理界面的导航骨架。

## 页面边界

### `/` 宣传首屏

- 使用浅色背景和本地优先字体，不依赖远程字体源。
- 使用 `public/icon/favicon.svg` 作为 favicon 和品牌主图标。
- 展示中文品牌名“开源协会知识库”。
- 展示现有首页领域示例中的主标题和说明，但不渲染分类卡片、最近文档列表或统计面板。
- 使用 Vue Bits Orb 作为主视觉，使用 Vue Bits Dock 作为底部悬浮导航。
- Dock 只承担展示和页面入口跳转，不承担业务状态。
- 页面左下角显示“天津科技大学开放原子开源协会”。
- 不出现 Sidebar、英文 eyebrow、开发态文字或多余的装饰性数据标签。

### `/workspace` 工作台占位页

- 使用 shadcn Sidebar 作为左侧工作台导航。
- 使用 Lucide 图标表达导航入口和操作入口。
- 展示“工作台”标题、导航分组和简洁空状态，用正式产品文案表达尚未有内容的状态。
- 不接入真实文档、分类、权限、搜索或持久化行为。
- Sidebar 只在工作台页面出现，避免工作台组件污染宣传首屏。

## 视觉方向

- 采用浅米白画布、深墨色文字、低饱和暖棕橙动作色。
- 宣传首屏使用宽屏中央构图：品牌在顶部，Hero 文案在左，Orb 在右；移动端变为单列。
- 主标题使用 `clamp()` 和宽容器，桌面端保持 1–2 行，不制造窄栏文字墙。
- 动效只保留 Hero 入场和 Orb 的轻微呼吸，避免复杂滚动场景破坏首屏聚焦。
- Dock 使用底部居中悬浮位置，避免遮挡主标题和 Orb。

## 组件与代码边界

```text
app/pages/index.vue
  └─ app/components/home/HomeLanding.vue
       ├─ app/components/navigation/HomeDock.vue
       └─ app/components/visual/HomeOrb.vue

app/pages/workspace.vue
  └─ app/components/workspace/WorkspaceShell.vue
       └─ shadcn Sidebar + Lucide icons
```

- `app/pages` 只负责路由级组合和数据加载。
- 首页展示组件不创建领域对象、不读取基础设施、不承载业务规则。
- 生成的 shadcn/Vue Bits 组件保留其库约定；项目自有包装组件使用职责命名，例如 `HomeDock.vue`、`HomeOrb.vue`，不重复目录上下文。
- 领域、应用和接口适配层继续保留，首页仍可通过既有 composable 获取 `HomePageViewModel`，但只读取 Hero 所需字段。
- 工作台占位页使用静态导航配置，未来接入真实路由和权限时再替换外层适配。

## 字体与图标源

- 在 Nuxt 配置中禁用 `@nuxt/fonts` 的 Google 和 Google Icons provider，避免构建时访问 `fonts.google.com`。
- CSS 使用 `Geist`, `Noto Sans SC`, `Microsoft YaHei`, `sans-serif` 的本地优先字体栈；项目不额外下载字体文件。
- Sidebar 和工作台导航使用 `@lucide/vue`；不使用 Material Symbols 远程字体。
- 页面 head 的 favicon 显式指向 `/icon/favicon.svg`。

## 验证策略

- 单元测试继续验证既有 Clean Architecture 用例和 presenter，不为纯展示样式添加脆弱的快照测试。
- `pnpm run lint:check` 验证 Vue/TypeScript 代码规则。
- `pnpm typecheck` 验证 shadcn、Dock、Orb 的组件类型和路由引用。
- `pnpm test` 验证既有用例。
- `pnpm build` 验证生产构建不再触发 Google Fonts/Material Symbols 远程请求，并确认输出成功。
- 浏览器验证 `/` 与 `/workspace`：桌面和 390px 移动视口无横向溢出，首页无 Sidebar，工作台有 Sidebar，控制台无运行时错误。

## 不在本次范围

- 不实现真实知识文档、编辑器、搜索、权限、收藏或持久化。
- 不实现工作台导航后的业务页面。
- 不引入 Markdown lint、拼写检查或额外严格代码规则。
- 不配置 CD 或部署流程。
