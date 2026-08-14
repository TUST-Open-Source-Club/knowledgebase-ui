import { describe, expect, it } from 'vitest';

import { presentHomePage } from '../../interface-adapters/presenters/home-page';
import type { HomePageData } from '../../application/dto/home-page';

describe('presentHomePage', () => {
  it('converts application data into a page view model', () => {
    const data: HomePageData = {
      title: '让知识持续生长',
      description: '把经验沉淀为可以复用的知识。',
      categories: [
        {
          id: 'engineering',
          name: '工程实践',
          description: '记录工程经验。',
          documentCount: 3,
        },
      ],
      documents: [
        {
          id: 'first-document',
          title: '第一篇文档',
          summary: '文档摘要。',
          category: '工程实践',
          updatedAt: '2026-08-14',
        },
      ],
    };

    const result = presentHomePage(data);

    expect(result.hero.title).toBe('让知识持续生长');
    expect(result.documentTotal).toBe(3);
    expect(result.categories[0]?.countLabel).toBe('3 篇文档');
    expect(result.documents[0]?.updatedAtLabel).toBe('2026.08.14');
  });
});
