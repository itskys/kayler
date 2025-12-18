# 🎨 Kayler - 智能卡片生成平台

一个功能强大的网络应用平台，集卡片排版、文本编辑、AI提示词管理于一身。支持多种导出格式、GitHub集成、主题切换等功能。

[在线体验](https://x.aisai.cc) | [项目文档](./PROJECT_STRUCTURE.md)

---

## ✨ 核心功能

### 1️⃣ **卡片生成器** - 文字排版利器
- 🎨 **10+ 主题**：羊皮纹、极简白、护眼绿、深海蓝、樱花粉、暗夜极客等
- 📐 **智能排版**：自动分页、长图控制、实时预览
- 🔤 **丰富字体**：黑体、宋体、思源宋体、楷体、手写体等多种选择
- 📊 **多种导出**：PNG 高清图、PDF 文档
- 💾 **自动保存**：本地缓存用户设置和草稿
- 📱 **响应式设计**：完美适配桌面和移动设备

### 2️⃣ **Markdown 编辑器** - 在线文档工具
- ✏️ **实时预览**：左侧编辑，右侧即时渲染
- 📝 **完整支持**：Markdown 全语法支持
- 🖼️ **长图生成**：一键生成文章长图（html2canvas）
- 📄 **PDF 导出**：支持 PDF 格式导出
- 🐙 **GitHub 发布**：直接发布到 GitHub 仓库
- 🔄 **自动保存**：编辑内容实时备份到本地

### 3️⃣ **提示词管理器** - AI 创意库
- 🔍 **智能搜索**：快速查找提示词
- 🏷️ **分类管理**：按类别组织提示词库
- 📊 **表格展示**：支持排序和筛选
- 👁️ **预览窗口**：Markdown 实时渲染预览
- 📋 **一键复制**：复制到剪贴板快速使用
- 💾 **导入导出**：本地数据管理

### 4️⃣ **AI 图片展** - 作品集锦
- 🖼️ **网格展示**：精美的图片墙布局
- 🔍 **轻盒预览**：点击查看高清详情
- 📱 **响应式**：适配各种屏幕尺寸
- ✨ **光滑交互**：悬停效果和平滑过渡

### 5️⃣ **权限管理系统** - GitHub 集成
- 🔐 **安全认证**：GitHub Token 验证
- 🔗 **魔法链接**：一键自动登录
- 🌍 **远程仓库**：连接任意 GitHub 仓库
- 📤 **文件上传**：直接发布到 GitHub
- 🔄 **权限同步**：全站统一权限管理

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
- 安装 Live Server 扩展
- 右键 `index.html` → Open with Live Server

---

## 📁 项目结构

```
kayler/
├── README.md                          # 项目说明（本文件）
├── PROJECT_STRUCTURE.md               # 详细架构文档
│
├── 📄 核心页面
├── index.html                         # 卡片生成器（主应用）
├── editor.html                        # Markdown 编辑器
├── promptmaster.html                  # 提示词管理器
├── aiGallery.html                     # AI 图片展
├── contact.html                       # 联系方式
├── 404.html                           # 错误页面
│
├── 🎯 JavaScript 脚本
├── layout.js                          # 全站导航/权限系统（核心）
├── editor.js                          # 编辑器逻辑
├── markdown-data.js                   # Markdown 示例数据
│
├── 🎨 样式文件
├── editor.css                         # 编辑器样式
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
|------|------|------|
| HTML5 | 页面结构 | - |
| CSS3 | 样式布局 | - |
| JavaScript | 交互逻辑 | ES6+ |
| marked.js | Markdown 渲染 | CDN |
| html2canvas | 网页截图 | 1.4.1 |
| html2pdf.js | PDF 生成 | 0.10.1 |

### 后端 / 集成
| 技术 | 用途 |
|------|------|
| GitHub API v3 | 文件上传、仓库操作 |
| localStorage | 本地数据持久化 |
| PWA | 离线支持、应用化 |

### 工具
| 工具 | 用途 |
|------|------|
| Python | 网格种子生成 |
| Git | 版本控制 |
| Cloudflare | CDN/部署 |

---

## 📖 详细使用指南

### 生成文字卡片

1. **打开** [卡片生成器](./index.html)
2. **输入文案** - 在文本框中输入要排版的内容
3. **选择主题** - 从下拉菜单选择喜欢的主题风格
4. **调整排版**：
   - 选择字体（黑体、宋体、楷体等）
   - 调整字号大小
   - 设置行高和间距
   - 选择文字颜色
5. **实时预览** - 右侧实时显示效果
6. **导出图片**：
   - 点击 **"生成长图"** 按钮
   - 选择 PNG 或 PDF 格式
   - 下载到本地

### 编辑和发布 Markdown

1. **打开** [在线编辑器](./editor.html)
2. **编辑内容** - 左侧编写 Markdown
3. **实时预览** - 右侧查看渲染效果
4. **生成长图** - 点击 **"生成长图"** 生成文章配图
5. **发布到 GitHub**（可选）：
   - 点击右上角 **"发布"** 按钮
   - 或先配置权限：页脚 → 管理员配置
   - 输入 GitHub token、仓库信息
   - 选择保存位置（如 `/images/`）
   - 点击 **"发布"** 上传到 GitHub

### 使用提示词

1. **打开** [提示词管理器](./promptmaster.html)
2. **搜索提示词** - 在搜索框输入关键词
3. **浏览分类** - 点击分类标签快速筛选
4. **预览详情** - 点击提示词行查看完整内容
5. **复制使用** - 点击 **"复制"** 按钮复制到剪贴板

### 查看作品集

1. **打开** [AI 图片展](./aiGallery.html)
2. **浏览图片** - 滚动浏览图片墙
3. **查看详情** - 点击图片打开详细预览
4. **分享作品** - 使用社交分享按钮

---

## 🔐 GitHub 集成配置

### 1. 获取 GitHub Token

1. 登录 [GitHub](https://github.com)
2. 进入 **Settings** → **Developer settings** → **Personal access tokens**
3. 点击 **Generate new token** （或 Fine-grained personal access tokens）
4. 设置权限：
   - 需要 `repo` 权限（上传文件到仓库）
   - 设置有效期（如 90 天）
5. 生成并复制 token（**立即保存，刷新页面后无法再看**）

### 2. 在 Kayler 中配置

**方式1：页面内配置**
```
任何页面 → 页脚 → ⚙️ 管理员配置
输入以下信息：
- GitHub Token: 粘贴你的 token
- 仓库所有者: 你的 GitHub 用户名
- 仓库名: 目标仓库名
点击"保存"
```

**方式2：魔法链接自动登录**
```
生成编码的配置链接（管理员用）：
https://x.aisai.cc/index.html?gh_key=BASE64_ENCODED_CONFIG
```

### 3. 发布文件到 GitHub

配置完成后，在编辑器或卡片生成器中：
- 点击 **"发布"** 或 **"上传到 GitHub"**
- 文件将被上传到指定仓库的 `/images/` 目录
- 自动生成 commit 信息

---

## ⚙️ 配置说明

### localStorage 数据

平台使用浏览器 localStorage 存储以下信息：

| 键名 | 说明 | 类型 |
|------|------|------|
| `gh_token` | GitHub API Token | String |
| `gh_owner` | 仓库所有者 | String |
| `gh_repo` | 仓库名 | String |
| `kayler_editor_cache` | 编辑器内容缓存 | String |
| `kayler_draft` | 编辑器草稿 | String |

**清除数据**：浏览器开发者工具 → Storage → Local Storage → 删除对应项

### PWA 应用配置

文件：`manifest.json`

支持将网站安装为桌面应用：
- Chrome/Edge：地址栏 → 安装应用
- Safari：分享 → 添加到主屏幕

---

## 🔧 Python 工具使用

### 网格种子生成器

用于生成 ShareX 截图软件的参考网格图。

```bash
cd kayler
python genimage.py
```

**配置参数**（在 genimage.py 中修改）：
- `TARGET_DPI` - 输出分辨率（220 = 双倍清晰）
- `GRID_SPACING_CM` - 网格间距（厘米）
- `COLS`, `ROWS` - 网格行列数
- `LINE_WIDTH` - 线条粗细
- `FONT_SIZE` - 文字大小

**输出**：`kayler_grid_seed_x2.png`

---

## 📱 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
|------|---------|------|
| Chrome | 80+ | ✅ 完全支持 |
| Firefox | 75+ | ✅ 完全支持 |
| Safari | 13+ | ✅ 完全支持 |
| Edge | 80+ | ✅ 完全支持 |
| IE 11 | - | ❌ 不支持 |

---

## 📋 常见问题

### Q1: 如何离线使用？
A: 作为 PWA 应用，首次访问后可以离线使用。在 Chrome 中点击地址栏的"安装"按钮。

### Q2: 生成的图片太小怎么办？
A: 在卡片生成器中，增大"字号"或"页面宽度"参数，生成的图片会更大更清晰。

### Q3: GitHub 上传失败？
A: 检查：
- Token 是否有效（未过期）
- 仓库名和所有者是否正确
- Token 是否有 `repo` 权限

### Q4: 为什么我的数据被清除了？
A: 浏览器的"清空缓存"会删除 localStorage。使用 GitHub 发布或下载备份。

### Q5: 可以修改 UI 吗？
A: 可以！编辑 CSS 变量在各 HTML 文件的 `<style>` 中修改颜色、字体等。

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

### 代码规范
- JavaScript：遵循 ES6+ 规范
- 注释：中英文混合，优先中文
- 提交信息：使用前缀（Add, Fix, Docs, etc）

---

## 📄 许可证

© 2025 Kaylerris. All rights reserved.

本项目代码遵循 [MIT License](./LICENSE)（如存在）。

---

## 📞 联系方式

- **Twitter**: [@Kaylerris](https://x.com/Kaylerris)
- **Email**: beabaed@gmail.com
- **主站**: [x.aisai.cc](https://x.aisai.cc)

---

## 🎯 路线图

- [ ] 完善提示词库数据
- [ ] 支持更多主题
- [ ] 移动端应用版本
- [ ] 协作编辑功能
- [ ] 国际化多语言
- [ ] 更多导出格式

---

## 📚 相关资源

- [项目架构文档](./PROJECT_STRUCTURE.md) - 深入了解项目设计
- [Markdown 编辑器教程](#) - 编辑器使用教学
- [GitHub API 文档](https://docs.github.com/rest) - GitHub 集成参考

---

**最后更新**：2025-12-17  
**版本**：2.0  
**维护者**：Kaylerris

