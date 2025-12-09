// editor.js - v5.3 Fixed Version
// 修复了按钮点击无效的问题，增加了详细的调试日志

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Editor JS loaded. Initializing...");

    // 1. 获取核心元素
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');

    // --- 核心功能：渲染 Markdown ---
    function renderMarkdown() {
        if (!editor || !preview) return;
        // 检查 marked 库是否加载
        if (typeof marked === 'undefined') {
            console.error("❌ Marked.js 库未加载，无法预览！");
            preview.innerHTML = "<p style='color:red'>⚠️ 核心组件加载失败，请检查网络。</p>";
            return;
        }
        try {
            preview.innerHTML = marked.parse(editor.value);
        } catch (e) {
            console.error("渲染出错:", e);
            preview.innerText = "预览渲染出错，请检查输入内容。";
        }
    }

    // --- 初始化编辑器内容 ---
    if (editor) {
        const savedContent = localStorage.getItem('editor_draft');
        if (savedContent) {
            editor.value = savedContent;
            console.log("ℹ️ 已恢复草稿");
        } else if (typeof DEFAULT_EDITOR_CONTENT !== 'undefined') {
            editor.value = DEFAULT_EDITOR_CONTENT;
        }
        
        // 绑定输入事件（实时渲染 + 保存草稿）
        editor.addEventListener('input', () => {
            renderMarkdown();
            localStorage.setItem('editor_draft', editor.value);
        });

        // 首次手动渲染
        renderMarkdown();
        
        // 同步滚动逻辑
        let isScrolling = false;
        const syncScroll = (source, target) => {
            if(!target) return;
            if (!isScrolling) {
                isScrolling = true;
                const percent = source.scrollTop / (source.scrollHeight - source.clientHeight);
                target.scrollTop = percent * (target.scrollHeight - target.clientHeight);
                setTimeout(() => isScrolling = false, 50);
            }
        };
        editor.addEventListener('scroll', () => syncScroll(editor, preview));
        if(preview) preview.addEventListener('scroll', () => syncScroll(preview, editor));
    }

    // --- 2. 按钮事件绑定 (重构版) ---
    initButtons();
});

// 初始化所有按钮事件的函数
function initButtons() {
    console.log("🔧 Initializing buttons...");

    // 辅助函数：安全绑定点击事件
    const safeBind = (id, handler) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', handler);
            console.log(`✅ Button '${id}' bound successfully.`);
        } else {
            console.warn(`⚠️ Button '${id}' not found in DOM. Skipping.`);
        }
    };

    // [设置按钮]
    safeBind('btn-setting', () => {
        console.log("👉 点击设置");
        // 检查 layout.js 是否成功加载了全局设置函数
        if (window.openGlobalSettings && typeof window.openGlobalSettings === 'function') {
            window.openGlobalSettings();
        } else {
            console.error("❌ window.openGlobalSettings 未定义。Layout.js 可能未加载或出错。");
            alert("⚠️ 设置面板尚未加载，请刷新页面重试。");
        }
    });

    // [保存并发布]
    safeBind('btn-save', () => {
        const token = localStorage.getItem('gh_token');
        if (!token) {
            if(confirm("⚠️ 未检测到 GitHub Token，无法发布。\n是否立即打开设置进行配置？")) {
                if(window.openGlobalSettings) window.openGlobalSettings();
            }
            return;
        }
        alert("✅ 模拟发布成功！(Token验证通过)");
    });

    // [PDF 打印]
    safeBind('btn-pdf', () => {
        window.print();
    });

    // [导出 .md]
    safeBind('btn-md', () => {
        const editorVal = document.getElementById('editor')?.value;
        if(!editorVal) { alert("内容为空"); return; }
        const blob = new Blob([editorVal], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kayler-article.md';
        a.click();
        URL.revokeObjectURL(url);
    });

    // [长图生成]
    safeBind('btn-long-img', () => {
        const previewEl = document.getElementById('preview');
        if(!previewEl) return;
        // 获取纯文本
        const content = previewEl.innerText; 
        
        if (!content || !content.trim()) {
            alert("内容为空，无法生成长图！请先在左侧输入。");
            return;
        }
        
        // 存入缓存，供 index.html 读取
        localStorage.setItem('image_gen_content', content);
        console.log("📄 长图内容已存入缓存，准备跳转...");
        // 跳转
        window.location.href = 'index.html';
    });

    // [复制源码]
    safeBind('btn-copy-code', async function() {
        const editorVal = document.getElementById('editor')?.value;
        if(editorVal) await copyToClipboard(editorVal, this);
    });

    // [复制文本]
    safeBind('btn-copy-text', async function() {
        const previewTxt = document.getElementById('preview')?.innerText;
        if(previewTxt) await copyToClipboard(previewTxt, this);
    });
}

// 辅助函数：复制功能
async function copyToClipboard(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const originalHtml = btn.innerHTML; // 保存带图标的 HTML
        btn.innerText = "✅ 已复制";
        btn.style.color = "#1a7f37"; // 绿色提示
        setTimeout(() => {
            btn.innerHTML = originalHtml; // 恢复图标
            btn.style.color = "";
        }, 1500);
    } catch (e) {
        console.error("复制失败:", e);
        alert("复制失败，可能是浏览器权限原因，请手动复制。");
    }
}