import type { HomeContentReader } from '../../domain/repositories/home-content';
import type { HomePageInputPort } from '../ports/home-page';
import type { HomePageData } from '../dto/home-page';

/**
 * 获取首页内容的唯一用例。
 *
 * 用例负责编排领域仓储和输出 DTO，不负责 HTTP、路由、Vue 响应式或页面样式。
 */
export class GetHomePageContent implements HomePageInputPort {
  public constructor(private readonly source: HomeContentReader) {}

  public async execute(): Promise<HomePageData> {
    const content = await this.source.read();

    return {
      title: content.title,
      description: content.description,
      categories: content.categories.map((category) => ({ ...category })),
      documents: content.documents.map((document) => ({ ...document })),
    };
  }
}
