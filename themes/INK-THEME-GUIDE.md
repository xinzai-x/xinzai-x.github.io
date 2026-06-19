# Ink 主题修改说明文档

> 适用于 AI 智能体后续修改参考  
> 博客地址: https://xinzai-x.github.io  
> 最后更新: 2026-06-19

---

## 一、文件结构

### CSS 文件
| 文件 | 作用 |
|------|------|
| `themes/ink/source/css/style.css` | 主样式（布局、颜色变量、排版、所有页面样式） |
| `themes/ink/source/css/highlight.css` | 代码块专用样式（figure.highlight 相关） |
| `themes/ink/source/css/lightbox.css` | 图片灯箱样式 |

### JS 文件
| 文件 | 作用 |
|------|------|
| `themes/ink/source/js/main.js` | 主逻辑（暗色模式、搜索、代码复制、代码展开按钮、TOC等） |
| `themes/ink/source/js/lightbox.js` | 图片灯箱 |
| `themes/ink/source/js/search.js` | 站内搜索 |

### EJS 模板文件
| 文件 | 作用 |
|------|------|
| `layout/layout.ejs` | 根布局（含 sidebar 条件渲染逻辑） |
| `layout/index.ejs` | 首页 |
| `layout/post.ejs` | 文章页 |
| `layout/page.ejs` | 普通页面（关于等） |
| `layout/links.ejs` | 友链页 |
| `layout/categories.ejs` | 分类页 |
| `layout/archive.ejs` | 归档页 |
| `layout/_partial/head.ejs` | HTML head（CSS 加载顺序） |
| `layout/_partial/header.ejs` | 顶部导航 |
| `layout/_partial/sidebar.ejs` | 侧边栏 |
| `layout/_partial/footer.ejs` | 底部（含社交图标 SVG） |
| `layout/_partial/toc.ejs` | 文章目录 |
| `layout/_partial/scripts.ejs` | JS 加载 |

### CSS 加载顺序（head.ejs）
```
1. Google Fonts
2. css/style.css
3. css/highlight.css
4. KaTeX CDN（math 公式）
```
**highlight.css 在 style.css 之后加载，同优先级规则 highlight.css 覆盖 style.css。**

---

## 二、颜色系统（CSS 变量）

### 亮色模式
| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg-primary` | `#faf8f5` | 页面背景（米白色） |
| `--bg-secondary` | `#f5f2ed` | 次级背景 |
| `--bg-tertiary` | `#efeae3` | 三级背景 |
| `--bg-card` | `#ffffff` | 卡片背景 |
| `--bg-code` | `#f8f5f0` | 代码块背景 |
| `--bg-code-inline` | `#ebe5da` | 行内代码背景 |
| `--bg-header` | `rgba(250,248,245,0.85)` | 头部毛玻璃 |
| `--text-primary` | `#2c2420` | 主文字 |
| `--text-secondary` | `#5a5048` | 次要文字 |
| `--text-tertiary` | `#8a7e74` | 辅助文字 |
| `--text-muted` | `#b0a598` | 淡化文字 |
| `--accent-primary` | `#9a7209` | 主题色（金色） |
| `--accent-secondary` | `#d4a017` | 辅助主题色 |
| `--accent-hover` | `#806008` | 悬停色 |
| `--accent-light` | `rgba(184,134,11,0.18)` | 浅色强调 |
| `--border-primary` | `#e8e0d6` | 主边框 |
| `--border-secondary` | `#d8cfc4` | 次边框 |

### 暗色模式
| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg-primary` | `#000000` | 页面背景（纯黑） |
| `--bg-secondary` | `#0a0a0a` | 次级背景 |
| `--bg-tertiary` | `#141414` | 三级背景 |
| `--bg-card` | `#0a0a0a` | 卡片背景 |
| `--bg-code` | `#0a0a0a` | 代码块背景 |
| `--bg-code-inline` | `#141414` | 行内代码背景 |
| `--text-primary` | `#e8e0d6` | 主文字 |
| `--text-secondary` | `#b0a598` | 次要文字 |
| `--accent-primary` | `#d4a017` | 主题色（金色） |
| `--border-primary` | `#1a1a1a` | 主边框 |

---

## 三、排版系统

### 字体
| 变量 | 值 |
|------|-----|
| `--font-body` | Noto Serif SC, 思源宋体, 微软雅黑, Georgia, serif |
| `--font-heading` | Noto Sans SC, 思源黑体, 微软雅黑, sans-serif |
| `--font-code` | JetBrains Mono, Fira Code, Consolas, monospace |

### 字号
| 变量 | 值 |
|------|-----|
| `--font-size-base` | `17px` |
| `--font-size-h1` | `2.15rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.35rem` |

### 布局
| 变量 | 值 |
|------|-----|
| `--max-width` | `1400px` |
| `--content-width` | `860px` |
| `--sidebar-width` | `240px` |
| `--header-height` | `60px` |
| `--container-padding` | `24px` |

---

## 四、响应式断点

### 手机端 (≤ 767px)
```css
--container-padding: 16px
--font-size-h1: 1.5rem
--font-size-h2: 1.25rem
--font-size-h3: 1.05rem
html { font-size: 15px }
.post-content { font-size: 0.95rem }
.page-content { font-size: 0.95rem }
```

### 超小屏幕 (≤ 360px)
```css
--container-padding: 12px
--font-size-h1: 1.45rem
--font-size-h2: 1.2rem
```

### 手机端代码块 (≤ 767px)
```css
figure.highlight .code { font-size: 0.82rem; padding: 14px 16px; }
```

---

## 五、代码块系统

### HTML 结构（Hexo 生成）
```html
<figure class="highlight">
  <table>
    <tr>
      <td class="gutter">行号（已隐藏）</td>
      <td class="code">
        <pre><code class="language-xxx">代码内容</code></pre>
      </td>
    </tr>
  </table>
  <button class="code-expand-btn">展开代码</button>
</figure>
```

### CSS 规则（highlight.css）
- `figure.highlight` → `overflow: hidden; position: relative; border-radius`
- `figure.highlight table td.gutter` → `display: none`（隐藏行号）
- `figure.highlight .code` → `padding: 16px 20px; font-size: 0.95rem`
- `figure.highlight .code pre` → `font-size: inherit; white-space: pre`
- `.code-expand-btn` → 展开/收起按钮（渐变遮罩 + 文字按钮）

### JS 展开按钮（main.js → CodeExpand 模块）
- 检测 `.code` 的 `scrollHeight > 420` 时触发
- 添加 `.is-expandable` 类 → 显示按钮
- 点击切换 `.is-expanded` 类 → 展开/收起（`maxHeight: none / 420px`）
- 按钮文字：「展开代码」/「收起代码」（含 SVG 图标）

### JS 代码样式修复（main.js → CodeStyleFix 模块）
- 对 `figure.highlight pre` 设置 `inline style`：background、border、borderRadius、margin、padding 为 none/0
- 目的：绕过 CSS 特异性问题

### 重要注意事项
1. **`.post-content table { display: block }` 会导致代码块内框问题** — 已移除，不要恢复
2. **`.post-content table { font-size: 0.95rem }` 也会干扰代码块** — 已移除，不要恢复
3. **`.post-content code { font-size: 0.88em }` 会影响代码字体** — 代码块字体通过 `.code { font-size: 0.95rem }` 覆盖
4. **`figure.highlight` 必须用 `overflow: hidden`** — 配合 JS maxHeight 实现展开效果
5. **`pre` 内联样式不能设 `overflow: visible` 或 `maxHeight: none`** — 否则展开按钮失效

---

## 六、暗色模式

### 切换机制
- `ThemeManager` 模块（main.js）
- 存储键：`localStorage` → `ink-theme`
- 检测 `prefers-color-scheme: dark` 媒体查询
- 通过 `data-theme="dark"` 属性切换
- 按钮 ID：`#theme-toggle`

### 代码块暗色模式特殊覆盖（highlight.css）
```css
[data-theme="dark"] figure.highlight {
  background-color: #0a0a0a;
  border-color: #1a1a1a;
}
```

---

## 七、首页与页面布局

### 首页
- `.post-list` 使用 CSS Grid `repeat(2, 1fr)` 两列布局
- 卡片统一高度：`-webkit-line-clamp: 3` 限制摘要行数
- `excerpt_length` 设为 80 字符

### 侧边栏
- `.content-wrap.with-sidebar` grid 布局：内容区 + 侧边栏(240px)
- `layout.ejs` 条件渲染：只在非文章页显示侧边栏
- 首页和分类页不显示侧边栏

### 文章页
- `.post-article` 使用 `max-width: none` 在 grid 内
- `.post-content` 包含文章正文
- `.post-content > pre` 对独立 pre 块有 `max-height: 420px; overflow: auto`

---

## 八、友链页

- 路由：`/link`（不是 `/links`）
- 模板：`layout/links.ejs`
- 需在 front matter 中设置 `layout: "links"` 才能使用此模板

---

## 九、部署

```powershell
hexo cl; hexo g; hexo d
```
- 使用 `;` 而不是 `&&`（win32 PowerShell 不支持 `&&`）
- 远程仓库：`github.com:xinzai-x/xinzai-x.github.io.git`
- 分支：`main`

---

## 十、修改历史记录

### 2026-06-18 ~ 2026-06-19

#### 1. 暗色模式改为纯黑色
- 将 warm-dark 色板（#1a1814, #242019 等）全部替换为纯黑
- `--bg-primary: #000000`, `--bg-secondary: #0a0a0a`, `--bg-tertiary: #141414`

#### 2. 首页两列布局
- `.post-list` 改为 `grid-template-columns: repeat(2, 1fr)`

#### 3. 页面标题移除
- 分类、归档、友链、关于页面不再显示标题头部

#### 4. 文章宽度优化
- `.container > .post-article`（无 grid 时）使用 `90vw`
- `.post-article`（在 grid 内）使用 `max-width: none`
- 侧边栏宽度缩为 240px

#### 5. 代码块内框修复
- 移除 `.post-content table { font-size: 0.95rem }` — 造成代码块内框
- 移除 `.post-content table { display: block }` — 造成代码块布局错乱
- 用户确认：这两条规则是代码块内框问题的根因

#### 6. 代码块展开按钮方案
- 尝试过滚动条方案（overflow + max-height），但 Hexo 的 table 结构导致滚动条无法正确定位
- 最终采用展开/收起按钮方案：
  - `figure.highlight { overflow: hidden; max-height: 420px }` (JS 控制)
  - 底部渐变遮罩 + "展开代码" 按钮
  - 点击展开为全部代码，再点收起

#### 7. 电脑端代码字体
- `figure.highlight .code { font-size: 0.95rem }`
- 手机端：`0.82rem`

#### 8. 手机端字号调整
- 基础字号 17px → 15px
- h1: 2.15rem → 1.5rem, h2: 1.6rem → 1.25rem, h3: 1.35rem → 1.05rem
- `.post-content { font-size: 0.95rem }`, `.page-content { font-size: 0.95rem }`

#### 9. 友链路由
- 配置 `link: /link`，front matter 用 `layout: "links"` 指定模板

#### 10. KaTeX CDN 报错
- `integrity` 属性哈希值过期，不影响代码块功能，可忽略

---

## 十一、常见修改指南

### 修改主题色
修改 `style.css` 中 `:root` 的 `--accent-primary` 和 `[data-theme="dark"]` 的 `--accent-primary`。

### 修改代码块字体大小
修改 `highlight.css` 中 `figure.highlight .code { font-size: }` 的值。
- 桌面端：直接改此值
- 手机端：改 `@media (max-width: 767px)` 内的 `figure.highlight .code { font-size: }`

### 修改代码块高度限制
在 `main.js` 的 `CodeExpand.init()` 中修改 `block.style.maxHeight = '420px'` 的数值。
同时修改 `highlight.css` 中对应的 CSS 值（如有）。

### 新增页面类型
1. 创建 `layout/新模板.ejs`
2. 文章 front matter 中使用 `layout: "新模板"`
3. 在 `layout.ejs` 中按需添加条件渲染逻辑

### 修改侧边栏显示条件
编辑 `layout.ejs` 中 sidebar 的条件渲染逻辑（约第 25-33 行）。

### 修改社交图标
1. 在 `_config.ink.yml` 的 `theme.social` 中添加配置
2. 在 `footer.ejs` 中添加对应的 SVG icon case
3. 注意：config key 就是显示名称

---

## 十二、关键教训（不要重蹈覆辙）

1. **`.post-content table` 不要加 `display: block` 或 `font-size`** — 会破坏代码块
2. **`figure.highlight` 必须用 `overflow: hidden`** — 展开按钮依赖此属性
3. **JS `CodeStyleFix` 设置 `pre` 内联样式时不要设 `padding: 0`** — 会被 CSS 覆盖回来，且影响代码块 padding
4. **CSS `overflow` + `max-height` 对 Hexo 的 table 结构无效** — 滚动条方案行不通，用展开按钮
5. **CSS 文件加载顺序**：style.css → highlight.css，同优先级后者覆盖前者
6. **内联样式优先级最高** — JS 设置的 style 属性会覆盖所有 CSS
7. **`!important` 应尽量避免使用** — 只在绕过框架样式时使用
8. **`.post-content > pre` 只匹配直接子元素** — 不影响 `figure.highlight` 内的 `pre`
9. **修改前先 grep 确认没有冲突规则** — style.css 和 highlight.css 都可能定义同名选择器
10. **部署前 hexo cl 确保清除缓存** — 否则旧文件可能残留
