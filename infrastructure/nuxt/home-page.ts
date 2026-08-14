import { GetHomePageContent } from '../../application/use-cases/get-home-page-content';
import { createHomePageController } from '../../interface-adapters/controllers/home-page';
import { InMemoryHomeContent } from '../persistence/in-memory-home-content';

/**
 * Nuxt 组合根是具体依赖的唯一组装点。
 * 页面和 composable 只调用本函数，不直接创建仓储或用例，保持框架层与业务层解耦。
 */
export function createHomePage() {
  const source = new InMemoryHomeContent();
  const useCase = new GetHomePageContent(source);

  return createHomePageController(useCase);
}
