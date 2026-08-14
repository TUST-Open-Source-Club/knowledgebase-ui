import { createHomePage } from '@infrastructure/nuxt/home-page';

/**
 * Nuxt 数据加载适配器。
 *
 * composable 只负责把 Nuxt 的异步数据生命周期接到 controller，不在这里创建
 * 仓储，也不把业务判断散落到页面生命周期中。
 */
export function useHomePage() {
  const controller = createHomePage();

  return useAsyncData('home-page', () => controller.load());
}
