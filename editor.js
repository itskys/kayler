// editor.js

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// 初始化
window.addEventListener('load', () => {
    // 恢复草稿
    const savedContent = localStorage.getItem('editor_draft');
    if (savedContent) {
        editor.value = savedContent;
    } else if (typeof DEFAULT_EDITOR_CONTENT !== 'undefined') {
        editor.value = DEFAULT_EDITOR_CONTENT;
    }
    renderMarkdown();
});

// 实时渲染
editor.addEventListener('input', () => {
    renderMarkdown();
    localStorage.setItem('editor_draft', editor.value);
});

function renderMarkdown() {
    if (typeof marked !== 'undefined') {
        preview.innerHTML = marked.parse(editor.value);
    }
}

// --- 按钮逻辑 ---

// 1. 设置
document.querySelector('.btn-setting').addEventListener('click', () => {
    // 调用 layout.js 提供的全局设置弹窗
    if (window.openGlobalSettings) {
        window.openGlobalSettings();
    } else {
        alert("Layout.js 未加载，无法打开设置");
    }
});

// 2. 保存并发布
document.getElementById('btn-save').addEventListener('click', () => {
    // 检查 layout.js 管理的 Token
    const token = localStorage.getItem('gh_token');
    if (!token) {
        if(confirm("⚠️ 未检测到 GitHub Token，无法发布。\n是否立即打开设置进行配置？")) {
            window.openGlobalSettings();
        }
        return;
    }
    alert("✅ 模拟发布成功！\n(实际发布逻辑可对接 GitHub API)");
});

// 3. PDF 打印
document.getElementById('btn-pdf').addEventListener('click', () => {
    window.print();
});

// 4. 导出 .md
document.getElementById('btn-md').addEventListener('click', () => {
    const blob = new Blob([editor.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kayler-article.md';
    a.click();
    URL.revokeObjectURL(url);
});

// 5. 生成长图 (修正版)
document.getElementById('btn-long-img').addEventListener('click', () => {
    // 获取纯文本
    const content = preview.innerText; 
    
    if (!content.trim()) {
        alert("内容为空，无法生成！");
        return;
    }
    
    // 存入缓存，供 index.html 读取
    localStorage.setItem('image_gen_content', content);
    
    // 跳转
    window.location.href = 'index.html';
});

// 6. 复制源码
document.getElementById('btn-copy-code').addEventListener('click', async function() {
    await copyToClipboard(editor.value, this);
});

// 7. 复制文本
document.getElementById('btn-copy-text').addEventListener('click', async function() {
    await copyToClipboard(preview.innerText, this);
});

// 辅助函数
async function copyToClipboard(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.innerText;
        btn.innerText = "已复制";
        setTimeout(() => btn.innerText = originalText, 1500);
    } catch (e) { console.error(e); }
}

// 同步滚动
let isScrolling = false;
editor.addEventListener('scroll', () => {
    if(!isScrolling) {
        isScrolling = true;
        const percent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        preview.scrollTop = percent * (preview.scrollHeight - preview.clientHeight);
        setTimeout(() => isScrolling = false, 50);
    }
});
preview.addEventListener('scroll', () => {
    if(!isScrolling) {
        isScrolling = true;
        const percent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
        editor.scrollTop = percent * (editor.scrollHeight - editor.clientHeight);
        setTimeout(() => isScrolling = false, 50);
    }
});