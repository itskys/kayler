
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

### 2️⃣ **Markdown 编辑器** - 在线文档工具 (v6.2)
- ✏️ **实时预览**：左侧编辑，右侧即时渲染
- 💻 **专业体验**：独立 CSS/JS 架构，界面清爽，支持 FontAwesome 图标
- 🧹 **一键清空**：**[NEW]** 快速重置编辑器内容，防误触设计
- 📝 **完整支持**：Markdown 全语法支持
- 🖼️ **长图生成**：一键生成文章长图（html2canvas），自动适配高度
- 📄 **PDF 导出**：支持高清 PDF 格式导出
- 🐙 **GitHub 发布**：直接发布到 GitHub 仓库 (支持 prompt 目录归档)

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

### 5️⃣ **权限管理系统** - GitHub 集成 (Core v6.0)
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

详情请参阅 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

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

本项目代码遵循 [MIT License](./LICENSE)（如存在）。

---

## 📞 联系方式

* **Twitter**: [@Kaylerris](https://x.com/Kaylerris)
* **Email**: beabaed@gmail.com
* **主站**: [x.aisai.cc](https://x.aisai.cc)

---

**最后更新**：2025-12-22

**核心版本**：Layout v6.0 | Editor v6.2
