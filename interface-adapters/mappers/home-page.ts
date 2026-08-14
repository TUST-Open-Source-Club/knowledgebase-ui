import type { HomePageData } from '../../application/dto/home-page';
import type { HomePageViewModel } from '../view-models/home-page';

function formatDate(value: string): string {
  return value.replaceAll('-', '.');
}

/**
 * 把 application DTO 映射成页面需要的稳定形状。
 * 所有展示格式化集中在这里，避免散落到多个 Vue 组件。
 */
export function mapHomePage(data: HomePageData): HomePageViewModel {
  return {
    hero: {
      title: data.title,
      description: data.description,
    },
    categories: data.categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      countLabel: `${category.documentCount} 篇文档`,
    })),
    documents: data.documents.map((document) => ({
      id: document.id,
      title: document.title,
      summary: document.summary,
      category: document.category,
      updatedAtLabel: formatDate(document.updatedAt),
    })),
  };
}
