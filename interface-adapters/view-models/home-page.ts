/**
 * 首页专用 view model。
 *
 * 这里的字段形状以页面展示为准，例如 `countLabel` 和 `updatedAtLabel` 已经完成
 * 了展示格式化，Vue 组件不需要了解领域数据的原始格式。
 */
export type HomePageViewModel = Readonly<{
  hero: Readonly<{
    title: string;
    description: string;
  }>;
  documentTotal: number;
  categories: readonly Readonly<{
    id: string;
    name: string;
    description: string;
    countLabel: string;
  }>[];
  documents: readonly Readonly<{
    id: string;
    title: string;
    summary: string;
    category: string;
    updatedAtLabel: string;
  }>[];
}>;
