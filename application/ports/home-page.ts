import type { HomePageData } from '../dto/home-page';

/**
 * 首页输入端口是 application 对外暴露的用例边界。
 * controller 依赖这个接口，因而可以在不改页面的情况下替换用例实现。
 */
export interface HomePageInputPort {
  execute(): Promise<HomePageData>;
}
