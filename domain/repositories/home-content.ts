import type { HomeContent } from '../entities/home-content';

/**
 * 领域层只声明“读取首页内容”这项能力，不关心内容来自 API、数据库还是内存。
 * 具体实现必须放在 infrastructure，避免领域规则反向依赖外部技术。
 */
export interface HomeContentReader {
  read(): Promise<HomeContent>;
}
