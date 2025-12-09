// markdown-data.js
// 存放 Markdown 语法示例和默认初始内容

const MARKDOWN_GUIDE = [
    { title: "标题", syntax: "# 一级标题\n## 二级标题", desc: "使用 # 号可表示 1-6 级标题" },
    { title: "粗体与斜体", syntax: "**粗体文本**\n*斜体文本*", desc: "使用 ** 或 * 包裹文本" },
    { title: "列表", syntax: "- 项目 1\n- 项目 2\n\n1. 有序 1\n2. 有序 2", desc: "使用 - 或 数字+点" },
    { title: "引用", syntax: "> 这是一段引用文本", desc: "使用 > 符号" },
    { title: "代码块", syntax: "```javascript\nconsole.log('Hello');\n```", desc: "使用三个反引号包裹" },
    { title: "链接与图片", syntax: "[链接文字](URL)\n![图片alt](图片URL)", desc: "注意图片前面有感叹号" },
    { title: "分割线", syntax: "---", desc: "三个减号" }
];

// 如果用户本地没有缓存，编辑器默认显示的初始欢迎文案
const DEFAULT_EDITOR_CONTENT = `# 欢迎使用 Markdown 编辑器

这是一段示例文本。你可以在这里**自由编辑**。

## 功能特性
- 左侧输入，右侧实时预览
- 支持 **一键复制代码**
- 支持 **一键复制纯文本**
- 点击右上角生成长图

> 试着修改这里的内容吧！
`;