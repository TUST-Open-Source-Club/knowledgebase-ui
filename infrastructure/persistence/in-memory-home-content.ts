import { createHomeContent, type HomeContent } from '../../domain/entities/home-content';
import type { HomeContentReader } from '../../domain/repositories/home-content';

/**
 * 当前阶段使用内存实现提供稳定示例数据。
 *
 * 后续接入 API 或数据库时，只替换这个基础设施实现，domain 和 application 不需要
 * 感知数据源变化。示例数据不代表真实业务数据模型。
 */
export class InMemoryHomeContent implements HomeContentReader {
  private readonly content: HomeContent = createHomeContent({
    id: 'home',
    title: '让知识持续生长',
    description: '把团队经验、实践方法与灵感，沉淀成可以持续复用的知识。',
    categories: [
      {
        id: 'engineering',
        name: '工程实践',
        description: '记录架构、工具与交付经验。',
        documentCount: 24,
      },
      {
        id: 'product',
        name: '产品设计',
        description: '分享调研、设计与复盘方法。',
        documentCount: 18,
      },
      {
        id: 'community',
        name: '社区成长',
        description: '汇聚活动、协作与成员故事。',
        documentCount: 12,
      },
    ],
    documents: [
      {
        id: 'team-knowledge',
        title: '团队协作与知识沉淀',
        summary: '从一次复盘开始，让有价值的经验被看见、被复用。',
        category: '工程实践',
        updatedAt: '2026-08-12',
      },
      {
        id: 'design-review',
        title: '设计评审的有效方法',
        summary: '建立清晰的讨论边界，让想法更快形成共识。',
        category: '产品设计',
        updatedAt: '2026-08-09',
      },
      {
        id: 'community-handbook',
        title: '社区活动组织手册',
        summary: '把一次次活动经验整理成可复用的协作流程。',
        category: '社区成长',
        updatedAt: '2026-08-05',
      },
    ],
  });

  public async read(): Promise<HomeContent> {
    return this.content;
  }
}
