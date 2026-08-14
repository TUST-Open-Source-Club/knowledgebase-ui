/**
 * 首页分类是展示内容中的一个稳定领域概念。
 *
 * 这里使用只读结构，避免外层适配器拿到领域对象后直接修改领域状态。
 */
export type HomeCategory = Readonly<{
  id: string;
  name: string;
  description: string;
  documentCount: number;
}>;

/** 首页文档摘要是领域层对文档的最小表达，不包含页面组件需要的样式信息。 */
export type HomeDocument = Readonly<{
  id: string;
  title: string;
  summary: string;
  category: string;
  updatedAt: string;
}>;

/**
 * 首页内容实体。
 *
 * 真实项目中，这里可以逐步承载知识空间、文档摘要等领域规则；当前只保留
 * 用于证明依赖方向的最小字段，不依赖 Vue、Nuxt 或任何数据驱动实现。
 */
export type HomeContent = Readonly<{
  id: string;
  title: string;
  description: string;
  categories: readonly HomeCategory[];
  documents: readonly HomeDocument[];
}>;

/**
 * 通过唯一构造入口创建实体，并冻结数组容器，防止外层意外改变领域数据。
 */
export function createHomeContent(input: HomeContent): HomeContent {
  return Object.freeze({
    ...input,
    categories: Object.freeze([...input.categories]),
    documents: Object.freeze([...input.documents]),
  });
}
