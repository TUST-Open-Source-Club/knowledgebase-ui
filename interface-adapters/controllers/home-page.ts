import type { HomePageInputPort } from '../../application/ports/home-page';
import { presentHomePage } from '../presenters/home-page';
import type { HomePageViewModel } from '../view-models/home-page';

/** 页面只依赖这个输出，不知道具体用例和基础设施如何组装。 */
export interface HomePageController {
  load(): Promise<HomePageViewModel>;
}

/**
 * 创建首页 controller。
 * 依赖从参数注入，便于在测试、服务端渲染和真实 API 场景下替换实现。
 */
export function createHomePageController(inputPort: HomePageInputPort): HomePageController {
  return {
    async load(): Promise<HomePageViewModel> {
      const data = await inputPort.execute();
      return presentHomePage(data);
    },
  };
}
