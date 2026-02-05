# Cloudflare 部署与 wrangler 本地调试

本文档说明如何完成 next-on-pages 构建、Cloudflare Pages 部署，以及使用 wrangler 进行本地调试。

## 一、构建与输出

### 1. next-on-pages 构建

使用 [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages) 将 Next.js 应用构建为 Cloudflare Pages 可用的格式：

```bash
npm run pages:build
# 等价于: npx @cloudflare/next-on-pages
```

构建会依次执行：

1. 使用 Vercel 构建流程产出 Next.js 应用（`.vercel/output`）
2. 将产出转换为 Pages Functions（Edge）+ 静态资源

**产出目录**：`.vercel/output/static`

- `_worker.js/`：Edge 函数与适配逻辑（如 `/api/health`）
- 静态 HTML、RSC、`_next/static` 等

### 2. SSR + Edge 说明

- **API 路由**：所有包含服务端逻辑的 API 需声明 `export const runtime = 'edge'`，否则无法在 Pages 上运行。
- **页面**：当前首页与关于页为客户端组件或静态预渲染，无需单独声明 edge；若今后增加服务端取数或 `getServerSideProps` 等价逻辑，对应路由也需使用 Edge Runtime。
- **wrangler**：必须在 `wrangler.toml` 中设置 `compatibility_flags = ["nodejs_compat"]`，否则运行时会报 `no-nodejs_compat`。

## 二、本地调试（wrangler pages dev）

### 1. 先构建再预览

```bash
npm run preview
```

会先执行 `pages:build`，再启动 `wrangler pages dev .vercel/output/static`，在本地用 workerd 模拟 Cloudflare 环境。

### 2. 仅启动预览（已构建过）

若已执行过 `npm run pages:build`，可直接：

```bash
npm run pages:dev
# 等价于: wrangler pages dev .vercel/output/static
```

`wrangler pages dev` 会读取项目根目录的 `wrangler.toml`（含 `compatibility_flags`），无需额外传参。默认在 **http://localhost:8788** 提供预览。

### 3. 开发流程建议

- **日常开发**：使用 `npm run dev`（Next 开发服务器），配合 `@cloudflare/next-on-pages/next-dev` 已在本项目 `next.config.ts` 中启用，可模拟 Cloudflare 绑定等。
- **部署前验证**：使用 `npm run preview` 或 `npm run pages:dev`，确保与 Cloudflare Pages 行为一致。

## 三、部署到 Cloudflare Pages

### 1. 手动部署（CLI）

```bash
npm run deploy
# 等价于: npm run pages:build && wrangler pages deploy .vercel/output/static
```

首次部署可能需先登录并选择/创建项目：

```bash
npx wrangler login
npx wrangler pages project create vibe-kanban-pages  # 可选，按需创建
```

### 2. Git 集成（推荐）

在 Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git 中：

| 选项           | 值                              |
|----------------|---------------------------------|
| 构建命令       | `npx @cloudflare/next-on-pages@1` |
| 构建输出目录   | `.vercel/output/static`         |
| 环境变量       | 可选设置 `NODE_VERSION` ≥ 16    |

并在 **Settings → Functions → Compatibility Flags** 中为生产与预览环境添加 `nodejs_compat`，Compatibility Date 建议 ≥ `2022-11-30`。

## 四、脚本与配置速查

| 命令 / 配置           | 说明 |
|------------------------|------|
| `npm run pages:build`  | next-on-pages 构建，产出 `.vercel/output/static` |
| `npm run preview`      | 构建 + `wrangler pages dev` 本地预览 |
| `npm run pages:dev`    | 仅运行 `wrangler pages dev`（需已构建） |
| `npm run deploy`       | 构建 + `wrangler pages deploy` 部署 |
| `wrangler.toml`        | `compatibility_flags = ["nodejs_compat"]`、`pages_build_output_dir` |

## 五、常见问题

- **no-nodejs_compat**：在 wrangler.toml 或 Dashboard 的 Functions 设置中启用 `nodejs_compat`。
- **构建失败 / 路径错误**：确认构建输出目录为 `.vercel/output/static`，与 `wrangler.toml` 中 `pages_build_output_dir` 一致。
- **API 在 Pages 上不工作**：检查对应 API 路由文件是否包含 `export const runtime = 'edge'`。
