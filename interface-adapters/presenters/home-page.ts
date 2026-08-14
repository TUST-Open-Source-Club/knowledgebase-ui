import type { HomePageData } from '../../application/dto/home-page';
import { mapHomePage } from '../mappers/home-page';
import type { HomePageViewModel } from '../view-models/home-page';

/**
 * presenter 是输出边界的命名入口。
 * 当前它委托给 mapper，未来可以在这里处理权限、空状态或错误状态的展示策略。
 */
export function presentHomePage(data: HomePageData): HomePageViewModel {
  return mapHomePage(data);
}
