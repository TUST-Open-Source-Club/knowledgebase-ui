/** 用例输出的分类 DTO，不直接把领域实体暴露给页面。 */
export type HomePageCategory = Readonly<{
  id: string;
  name: string;
  description: string;
  documentCount: number;
}>;

/** 用例输出的文档 DTO，只包含首页所需的数据。 */
export type HomePageDocument = Readonly<{
  id: string;
  title: string;
  summary: string;
  category: string;
  updatedAt: string;
}>;

/**
 * application 层对“首页内容”用例结果的稳定表达。
 * 页面和 presenter 只依赖这个 DTO，不依赖领域实体的内部变化。
 */
export type HomePageData = Readonly<{
  title: string;
  description: string;
  categories: readonly HomePageCategory[];
  documents: readonly HomePageDocument[];
}>;
