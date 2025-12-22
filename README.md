
```markdown
# 🤖 Kayler - AI创作工具箱

一个专为 AI 创作者和内容生产者打造的一站式效率平台。

这里集成了 **Prompt 提示词管理**、**Markdown 在线文档**、**智能文字卡片** 以及 **AI 画廊**。从灵感管理到内容排版，Kayler 帮你打通 AI 创作的“最后一公里”。

[在线体验](https://x.aisai.cc) | [项目文档](./PROJECT_STRUCTURE.md)

---

## ✨ 核心功能

### 1️⃣ **卡片生成器** - 文字排版利器 (v3.5)
- 📕 **小红书风格**：**[NEW]** 一键自动排版，智能添加 Emoji 装饰和底部话题标签，轻松制作爆款笔记
- 🎨 **10+ 主题**：羊皮纹、极简白、护眼绿、深海蓝、樱花粉、暗夜极客等
- 📐 **智能排版**：自动分页、长图控制、实时预览
- 🔤 **丰富字体**：黑体、宋体、思源宋体、楷体、手写体等多种选择
- 📊 **多种导出**：PNG 高清图、PDF 文档
- 💾 **自动保存**：本地缓存用户设置和草稿
- 📱 **响应式设计**：完美适配桌面和移动设备

### 2️⃣ **Markdown 编辑器** - 在线文档工具
- ✏️ **实时预览**：左侧编辑，右侧即时渲染
- 💻 **专业体验**：独立 CSS/JS 架构，界面清爽，支持 FontAwesome 图标
- 🧹 **一键清空**：**[NEW]** 快速重置编辑器内容，防误触设计
- 📝 **完整支持**：Markdown 全语法支持
- 🖼️ **长图生成**：一键生成文章长图（html2canvas），自动适配高度
- 📄 **PDF 导出**：支持高清 PDF 格式导出
- 🐙 **GitHub 发布**：直接发布到 GitHub 仓库

### 3️⃣ **提示词管理器** - AI 创意库
- 💻 **Monaco 集成**：**[NEW]** 引入 VS Code 同款编辑器，支持语法高亮、代码补全
- 🔍 **智能搜索**：快速查找提示词
- 🏷️ **分类管理**：按类别组织提示词库
- 📊 **表格展示**：支持排序和筛选
- 👁️ **预览窗口**：Markdown 实时渲染预览
- 📋 **一键复制**：复制到剪贴板快速使用
- 💾 **导入导出**：支持与在线编辑器互通数据

### 4️⃣ **AI 画廊** - 作品集锦
- 🖼️ **网格展示**：精美的图片墙布局
- 🔍 **轻盒预览**：点击查看高清详情
- 📱 **响应式**：适配各种屏幕尺寸
- ✨ **光滑交互**：悬停效果和平滑过渡

### 5️⃣ **权限管理系统** - GitHub 集成 (v6.1 Core)
- 🔐 **安全认证**：GitHub Token 验证
- 🔗 **魔法链接**：一键生成跨设备登录链接
- 🌍 **远程仓库**：连接任意 GitHub 仓库
- 📤 **文件上传**：直接发布到 GitHub
- 🔄 **权限同步**：全站统一权限管理，状态实时刷新

---

## 🚀 快速开始

### 在线使用（推荐）
直接访问 [https://x.aisai.cc](https://x.aisai.cc) 即可使用所有功能。

### 本地开发

#### 前置要求
- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 可选：Python 3.6+ （用于网格生成工具）
- 可选：Node.js（如需自己构建/部署）

#### 启动方式

**方式1：直接打开 HTML**
```bash
# 使用本地文件管理器打开
index.html

```

**方式2：启动本地服务器**

```bash
# 使用 Python
python -m http.server 8000

# 然后访问
http://localhost:8000

```

**方式3：使用 VS Code Live Server**

* 安装 Live Server 扩展
* 右键 `index.html` → Open with Live Server

---

## 📁 项目结构

```
kayler/
├── README.md                          # 项目说明（本文件）
├── PROJECT_STRUCTURE.md               # 详细架构文档
│
├── 📄 核心页面
├── index.html                         # 卡片生成器（主应用 v3.5）
├── editor.html                        # Markdown 编辑器（重构版）
├── promptmaster.html                  # 提示词管理器（Monaco 版）
├── aiGallery.html                     # AI 画廊
├── contact.html                       # 联系方式
├── 404.html                           # 错误页面
│
├── 🎯 JavaScript 脚本
├── layout.js                          # 全站导航/权限系统 (v6.1)
├── editor.js                          # 编辑器逻辑 (v6.2)
├── markdown-data.js                   # Markdown 示例数据
│
├── 🎨 样式文件
├── editor.css                         # 编辑器独立样式 (v6.1)
│
├── 🐍 Python 工具
├── genimage.py                        # 网格种子生成器
│
├── 📦 资源和配置
├── manifest.json                      # PWA 配置
├── robots.txt                         # SEO 爬虫规则
├── sitemap.xml                        # 网站地图
├── favicon.png                        # 网站图标
├── logo.png                           # LOGO
├── social-cover.png                   # 社交分享封面
│
├── 📁 数据目录
├── images/                            # 用户生成的图片
├── gallery/                           # AI 图片库
├── prompt/                            # 提示词文档
└── .git/                              # Git 仓库

```

---

## 🛠️ 技术栈

### 前端

| 技术 | 用途 | 版本 |
| --- | --- | --- |
| HTML5 | 页面结构 | - |
| CSS3 | 样式布局 | - |
| JavaScript | 交互逻辑 | ES6+ |
| **Monaco Editor** | 代码编辑器核心 | 0.45.0 |
| marked.js | Markdown 渲染 | CDN |
| html2canvas | 网页截图 | 1.4.1 |
| html2pdf.js | PDF 生成 | 0.10.1 |
| FontAwesome | 图标库 | 6.4.0 |

### 后端 / 集成

| 技术 | 用途 |
| --- | --- |
| GitHub API v3 | 文件上传、仓库操作 |
| localStorage | 本地数据持久化 |
| PWA | 离线支持、应用化 |

### SEO & 运营

| 技术 | 用途 |
| --- | --- |
| Sitemap | 站点地图索引 |
| Open Graph | 社交分享卡片优化 |
| Meta Tags | 搜索引擎关键词优化 |

---

## 📖 详细使用指南

### 生成文字卡片

1. **打开** [卡片生成器](https://www.google.com/search?q=./index.html)
2. **输入文案** - 在文本框中输入要排版的内容
3. **选择主题** - 从下拉菜单选择喜欢的主题风格
4. **小红书风格** - 勾选"📕 小红书风"，自动添加 Emoji 和标签
5. **调整排版** - 字体、字号、间距等
6. **导出图片** - 点击 **"保存"** 或 **"复制"**

### 编辑和发布 Markdown

1. **打开** [在线编辑器](https://www.google.com/search?q=./editor.html)
2. **编辑内容** - 左侧编写 Markdown，支持清空重置
3. **实时预览** - 右侧查看渲染效果
4. **生成长图** - 点击 **"转长图"** 生成文章配图
5. **发布到 GitHub**：
* 需先配置 GitHub Token
* 点击 **"发布"** 按钮，文件将自动上传



### 使用提示词

1. **打开** [提示词管理器](https://www.google.com/search?q=./promptmaster.html)
2. **专业编辑** - 使用 Monaco 编辑器编写 Prompt，享受代码高亮
3. **管理库** - 搜索、筛选、预览、复制提示词
4. **导入导出** - 将提示词导入到编辑器进行二次创作

---

## ⚙️ 配置说明

### localStorage 数据

平台使用浏览器 localStorage 存储以下信息：

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| `gh_token` | GitHub API Token | String |
| `gh_owner` | 仓库所有者 | String |
| `gh_repo` | 仓库名 | String |
| `kayler_editor_cache` | 编辑器内容缓存 | String |
| `kayler_draft` | 编辑器草稿 | String |

**清除数据**：浏览器开发者工具 → Storage → Local Storage → 删除对应项

---

## 🔧 Python 工具使用

### 网格种子生成器

用于生成 ShareX 截图软件的参考网格图。

```bash
cd kayler
python genimage.py

```

**配置参数**（在 genimage.py 中修改）：

* `TARGET_DPI` - 输出分辨率（220 = 双倍清晰）
* `GRID_SPACING_CM` - 网格间距（厘米）
* `COLS`, `ROWS` - 网格行列数
* `LINE_WIDTH` - 线条粗细
* `FONT_SIZE` - 文字大小

**输出**：`kayler_grid_seed_x2.png`

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

```bash
# 1. Fork 项目
# 2. 创建功能分支
git checkout -b feature/新功能

# 3. 提交变更
git commit -m "Add: 新功能描述"

# 4. 推送分支
git push origin feature/新功能

# 5. 提交 Pull Request

```

---

## 📄 许可证

© 2025 Kaylerris. All rights reserved.

本项目代码遵循 [MIT License](https://www.google.com/search?q=./LICENSE)（如存在）。

---

## 📞 联系方式

* **Twitter**: [@Kaylerris](https://x.com/Kaylerris)
* **Email**: beabaed@gmail.com
* **主站**: [x.aisai.cc](https://x.aisai.cc)

---

**最后更新**：2025-12-21

**版本**：v3.5 (Core v6.1)

**维护者**：Kaylerris

```

```