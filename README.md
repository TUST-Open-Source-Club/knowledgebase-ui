# 天津科技大学开放原子开源协会 - 知识库

类语雀知识库项目，基于 Nuxt 4 + Vue 3 构建。

## 技术栈

- **框架**: [Nuxt 4](https://nuxt.com)
- **UI**: Vue 3 + TypeScript
- **包管理**: pnpm

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 开发命令

| 命令             | 说明                  |
| ---------------- | --------------------- |
| `pnpm dev`       | 启动开发服务器        |
| `pnpm build`     | 构建生产版本          |
| `pnpm generate`  | 静态站点生成          |
| `pnpm lint`      | ESLint 检查并自动修复 |
| `pnpm format`    | Prettier 代码格式化   |
| `pnpm typecheck` | TypeScript 类型检查   |

## 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，通过 `commitlint` + `husky` 强制执行。

```
<type>(<scope>): <subject>

feat(auth): 添加用户登录功能
fix(api): 修复数据请求超时问题
docs(readme): 更新项目文档
```

### type 类型

| type       | 说明                   |
| ---------- | ---------------------- |
| `feat`     | 新功能                 |
| `fix`      | 修复 bug               |
| `docs`     | 文档更新               |
| `style`    | 代码格式（不影响逻辑） |
| `refactor` | 重构                   |
| `perf`     | 性能优化               |
| `test`     | 测试                   |
| `chore`    | 构建/工具变动          |
| `ci`       | CI 配置                |
| `revert`   | 回滚                   |

## 项目结构

```
├── app/            # 应用页面、组件、布局
├── public/         # 静态资源
├── nuxt.config.ts  # Nuxt 配置
├── tsconfig.json   # TypeScript 配置
└── CONTRIBUTING.md # 贡献指南
```

## 贡献

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解贡献流程。

## License

[MIT](./LICENSE)
