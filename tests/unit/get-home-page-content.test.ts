import { describe, expect, it } from 'vitest';

import { InMemoryHomeContent } from '../../infrastructure/persistence/in-memory-home-content';
import { GetHomePageContent } from '../../application/use-cases/get-home-page-content';

describe('GetHomePageContent', () => {
  it('returns the content required by the knowledge base home page', async () => {
    const source = new InMemoryHomeContent();
    const useCase = new GetHomePageContent(source);

    const result = await useCase.execute();

    expect(result.title).toBe('让知识持续生长');
    expect(result.categories).toHaveLength(3);
    expect(result.documents[0]?.title).toBe('团队协作与知识沉淀');
  });
});
