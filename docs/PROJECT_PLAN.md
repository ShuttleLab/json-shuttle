# JSON Shuttle 项目设计规划

## 技术栈

- **框架**: Next.js 15（App Router）
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Cloudflare Pages（next-on-pages），Edge Runtime
- **本地调试**: wrangler，`compatibility_flags = ["nodejs_compat"]`

---

## 功能需求设计

### 1. 多语言（i18n）

- 内置中文 / 英文切换
- 语言状态保存在浏览器（如 localStorage），刷新后保持

### 2. 格式化校验功能

- 一键校验 JSON 文本
- 出错时高亮/标注错误位置（行号、列、错误信息）

### 3. 格式修补功能

- 一键把错误格式修复为合法 JSON（如补全引号、括号、修正常见错误）

### 4. 格式变更功能（一）

- 一键变为标准格式（美化、缩进）
- 一键压缩为最短内容（去除多余空白与换行）

### 5. 格式变更功能（二）

- 一键转义（如 `"` → `\"`，便于嵌入字符串）
- 一键去除转义（反向操作）

---

## 关于页面设计（参考 about-content.tsx）

- **服务介绍**: 说明 JSON Shuttle 的用途与特点
- **安全特性**: 4 块卡片（如：快速、安全、隐私、时效），每块含图标 + 标题 + 描述
- **使用场景**: 列表形式展示典型使用场景
- **支持我们**: 支持/捐赠按钮、分享按钮，渐变背景区域
- **联系方式**: 文案 + 邮箱链接（可替换为项目实际邮箱）

关于页需接入多语言（与首页一致的 i18n）。

---

## 部署设计

- 目标：Cloudflare Pages
- 使用 **next-on-pages** 构建，支持 SSR + Edge Runtime
- 所有动态 API 路由需声明：`export const runtime = 'edge'`
- **wrangler.toml** 配置：
  - `compatibility_flags = ["nodejs_compat"]`
  - 支持 `wrangler pages dev` 或相应命令进行本地调试

---

## 任务拆解（与 Vibe Kanban 对应）

| 序号 | 任务名称 | 说明 |
|------|----------|------|
| 1 | 初始化 Next.js 15 项目 | App Router、TypeScript、Tailwind CSS，基础目录与配置 |
| 2 | 配置 Cloudflare Pages 与 Edge | wrangler.toml、next-on-pages、edge runtime 声明 |
| 3 | 项目基础布局与导航 | 全局布局、导航栏、页脚、主页面骨架 |
| 4 | 多语言 i18n（中/英 + 持久化） | i18n Provider、语言切换 UI、localStorage 持久化 |
| 5 | JSON 格式化校验功能 | 校验逻辑、错误高亮/定位、一键校验 UI |
| 6 | JSON 格式修补功能 | 自动修复常见错误，一键修补 UI |
| 7 | JSON 格式变更（美化/压缩） | 标准格式化与压缩，一键操作 UI |
| 8 | JSON 转义/去除转义 | 转义与去转义逻辑及 UI |
| 9 | 关于页面 | 服务介绍、安全特性、支持我们、联系方式（参考 about-content） |
| 10 | Cloudflare 部署与 wrangler 调试 | 构建与部署流程、SSR+Edge 优化、本地 wrangler 调试 |

---

## 扩展性说明

- 代码结构预留扩展入口（如工具列表、新工具页路由）
- 后续可增加：JSON 对比、JSON Path、YAML/JSON 互转等模块
