import { describe, expect, it } from 'vitest';

import { workspaceNavigation } from '../../app/components/workspace/navigation';

describe('workspaceNavigation', () => {
  it('provides stable workspace entries without homepage-only decoration', () => {
    expect(workspaceNavigation.map((item) => item.label)).toEqual([
      '知识空间',
      '收藏内容',
      '最近访问',
    ]);
    expect(workspaceNavigation.every((item) => item.icon.length > 0)).toBe(true);
  });
});
