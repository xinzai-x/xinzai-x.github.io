# Cleartext Theme

一个现代化、高性能的 Hexo 博客主题，采用 CSS Grid 布局和现代设计系统。

## ✨ 特性

- **现代设计系统**：基于 CSS 变量和 8px 间距比例
- **响应式布局**：完美适配桌面和移动设备
- **深色模式**：支持自动切换和手动切换
- **性能优化**：图片懒加载、JS 延迟加载、字体预加载
- **SEO 友好**：完整的 Open Graph 和结构化数据
- **代码高亮**：支持多种编程语言和复制按钮
- **多栏布局**：支持 Markdown 中的多列内容
- **提示框**：支持 info/warning/tip/danger 四种类型

## 🚀 快速开始

1. **安装主题**
   ```bash
   cd your-hexo-blog
   git clone https://github.com/your-repo/cleartext themes/cleartext
   ```

2. **启用主题**
   在 Hexo 配置文件 `_config.yml` 中：
   ```yaml
   theme: cleartext
   ```

3. **启动服务器**
   ```bash
   hexo clean && hexo generate && hexo server
   ```

## ⚙️ 配置

主题配置文件位于 `themes/cleartext/_config.yml`，包含以下主要配置项：

### 配色方案
```yaml
color_scheme:
  primary: "#1e293b"     # 主色调
  accent: "#0ea5e9"      # 强调色
  background: "#f8fafc"  # 背景色
  text: "#334155"        # 文字色
```

### 导航菜单
```yaml
menu:
  首页: /
  归档: /archives/
  分类: /categories/
  标签: /tags/
  关于: /about/
  友链: /links/
```

### 侧边栏
```yaml
sidebar:
  enable: true
  widgets:
    - recent_posts
    - categories
    - tag_cloud
    - archives
```

### 文章目录
```yaml
toc:
  enable: true
  max_depth: 4
  sticky: true
```

### 深色模式
```yaml
dark_mode:
  enable: true
  default: auto
```

## 📁 项目结构

```
cleartext/
├── _config.yml          # 主题配置文件
├── README.md           # 本文件
├── docs/               # 文档
│   ├── deployment-checklist.md
│   └── diagnosis-report.md
├── layout/             # 布局模板
│   ├── *.ejs          # 主布局文件
│   └── partial/       # 局部模板
├── source/             # 静态资源
│   ├── css/           # 样式文件
│   ├── js/            # JavaScript
│   └── images/        # 图片
├── scripts/            # Hexo 插件
└── node_modules/       # 依赖包
```

## 🎨 CSS 架构

主题采用模块化 CSS 架构：

- **设计令牌**：CSS 变量定义颜色、间距、字体等
- **基础样式**：重置、排版、响应式基础
- **组件样式**：卡片、按钮、表单、导航等
- **工具类**：实用工具类

## 🔧 开发指南

### 修改样式
所有样式定义在 `source/css/style.css` 中，采用 BEM 命名约定。

### 添加新页面
1. 在 `layout/` 目录创建新的 `.ejs` 模板
2. 在 `_config.yml` 中添加菜单项
3. 在 Hexo 的 `source/` 目录创建对应的 Markdown 文件

### 自定义组件
1. 在 `layout/partial/` 创建组件模板
2. 在需要的地方使用 `<%- partial('partial/component-name') %>`

## 📱 响应式断点

- `@media (max-width: 767px)`：移动设备
- `@media (min-width: 768px)`：平板
- `@media (min-width: 1024px)`：桌面

## 🐛 故障排除

### 页面空白
1. 检查 CSS 和 JS 文件路径是否正确
2. 验证 EJS 语法是否正确
3. 查看浏览器开发者工具控制台

### 样式问题
1. 检查 CSS 变量是否正确定义
2. 验证响应式断点是否正确
3. 确保没有 CSS 冲突

### 部署问题
参考 `docs/deployment-checklist.md` 中的详细检查清单。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请：
1. 查看文档
2. 提交 Issue
3. 联系维护者