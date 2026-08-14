/** 工作台导航项只描述入口和图标，不携带权限或业务状态。 */
export type WorkspaceNavigationItem = Readonly<{
  label: string;
  icon: string;
  href: string;
}>;

/**
 * 工作台的静态信息架构示例。
 *
 * 真实导航接入权限和路由时，只替换这个页面适配配置，不修改 Sidebar 组件。
 */
export const workspaceNavigation: readonly WorkspaceNavigationItem[] = [
  { label: '知识空间', icon: 'House', href: '/workspace#spaces' },
  { label: '收藏内容', icon: 'Bookmark', href: '/workspace#saved' },
  { label: '最近访问', icon: 'Clock3', href: '/workspace#recent' },
];
