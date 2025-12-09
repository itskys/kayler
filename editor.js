// editor.js

// 1. DOM 元素获取
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const btnCopyCode = document.getElementById('btn-copy-code');
const btnCopyText = document.getElementById('btn-copy-text');
const btnGenerate = document.getElementById('btn-generate-img');
const btnHelp = document.getElementById('btn-help'); // 新增
const guidePanel = document.getElementById('guide-panel'); // 新增
const guideContent = document.getElementById('guide-content'); // 新增

// 2. 初始化与渲染
window.addEventListener('load', () => {
    // 尝试读取本地缓存
    const savedContent = localStorage.getItem('editor_draft');
    
    // 如果有缓存，用缓存；如果没有，读取 markdown-data.js 中的默认内容
    if (savedContent) {
        editor.value = savedContent;
    } else if (typeof DEFAULT_EDITOR_CONTENT !== 'undefined') {
        editor.value = DEFAULT_EDITOR_CONTENT;
    }
    
    renderMarkdown();
    loadSyntaxGuide(); // 加载语法指南
});

editor.addEventListener('input', () => {
    renderMarkdown();
    localStorage.setItem('editor_draft', editor.value);
});

function renderMarkdown() {
    if (typeof marked !== 'undefined') {
        preview.innerHTML = marked.parse(editor.value);
    }
}

// 3. 动态加载语法指南 (读取 markdown-data.js)
function loadSyntaxGuide() {
    if (typeof MARKDOWN_GUIDE === 'undefined') return;

    let html = '';
    MARKDOWN_GUIDE.forEach(item => {
        html += `
            <div class="guide-item">
                <div class="guide-title">${item.title}</div>
                <div class="guide-code">${item.syntax}</div>
                <div class="guide-desc">${item.desc}</div>
            </div>
        `;
    });
    guideContent.innerHTML = html;
}

// 4. 按钮事件监听

// 切换语法帮助面板
btnHelp.addEventListener('click', () => {
    guidePanel.classList.toggle('active');
    btnHelp.style.color = guidePanel.classList.contains('active') ? '#1890ff' : '#666';
});

// 复制源码
btnCopyCode.addEventListener('click', async () => {
    await copyToClipboard(editor.value, btnCopyCode);
});

// 复制纯文本
btnCopyText.addEventListener('click', async () => {
    await copyToClipboard(preview.innerText, btnCopyText);
});

// 通用复制函数
async function copyToClipboard(text, btnElement) {
    try {
        await navigator.clipboard.writeText(text);
        showFeedback(btnElement, '✅ 已复制');
    } catch (err) {
        console.error(err);
        showFeedback(btnElement, '❌ 失败');
    }
}

function showFeedback(btn, msg) {
    const originalText = btn.innerText;
    btn.innerText = msg;
    btn.style.borderColor = '#52c41a';
    btn.style.color = '#52c41a';
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.borderColor = '';
        btn.style.color = '';
    }, 1500);
}

// 5. 生成长图逻辑 (关键修改：复制纯文本到 index.html)
btnGenerate.addEventListener('click', () => {
    // 获取渲染后的纯文本 (innerText)
    const contentForImage = preview.innerText;

    if (!contentForImage.trim()) {
        alert("内容为空，无法生成！");
        return;
    }

    // 存入 localStorage 供 index.html 使用
    // 注意：这里使用的是 'image_gen_content'，请确保 index.html 读取的是这个 key
    localStorage.setItem('image_gen_content', contentForImage);

    // 跳转
    window.location.href = 'index.html';
});

// 6. 同步滚动
let isScrolling = false;
editor.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        const percent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        preview.scrollTop = percent * (preview.scrollHeight - preview.clientHeight);
        setTimeout(() => isScrolling = false, 50);
    }
});
preview.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        const percent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
        editor.scrollTop = percent * (editor.scrollHeight - editor.clientHeight);
        setTimeout(() => isScrolling = false, 50);
    }
});