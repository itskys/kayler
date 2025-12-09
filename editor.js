// editor.js v6.0 - 强制修复版

// 等待页面完全加载（包括 layout.js 注入的元素）
window.addEventListener('load', () => {
    console.log("🔥 Editor.js v6.0 Loaded & Ready");

    // === 核心元素 ===
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');

    // === 1. 初始化渲染函数 ===
    function renderMarkdown() {
        if (!editor || !preview) return;
        if (typeof marked !== 'undefined') {
            preview.innerHTML = marked.parse(editor.value);
        } else {
            preview.innerHTML = editor.value; // 降级处理
        }
    }

    // === 2. 加载草稿 & 绑定输入 ===
    if (editor) {
        const saved = localStorage.getItem('editor_draft');
        if (saved) editor.value = saved;
        else if (typeof DEFAULT_EDITOR_CONTENT !== 'undefined') editor.value = DEFAULT_EDITOR_CONTENT;
        
        editor.addEventListener('input', () => {
            renderMarkdown();
            localStorage.setItem('editor_draft', editor.value);
        });
        
        // 首次渲染
        renderMarkdown();
    }

    // === 3. 按钮暴力绑定 (确保生效) ===

    // [设置按钮]
    const btnSetting = document.getElementById('btn-setting');
    if (btnSetting) {
        btnSetting.onclick = function() {
            console.log("Click: Setting");
            // 检查 layout.js 是否加载
            if (typeof window.openGlobalSettings === 'function') {
                window.openGlobalSettings();
            } else {
                alert("设置面板加载中，请稍后...");
                console.error("Layout.js functions not found");
            }
        };
    } else {
        console.error("❌ 找不到 ID 为 'btn-setting' 的按钮");
    }

    // [保存按钮]
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.onclick = function() {
            console.log("Click: Save");
            const token = localStorage.getItem('gh_token');
            if (!token) {
                if(confirm("⚠️ 未配置 GitHub Token，去设置？")) {
                    if(window.openGlobalSettings) window.openGlobalSettings();
                }
            } else {
                alert("✅ 模拟发布成功！(Token有效)");
            }
        };
    }

    // [PDF 按钮]
    const btnPdf = document.getElementById('btn-pdf');
    if (btnPdf) btnPdf.onclick = () => window.print();

    // [.md 按钮]
    const btnMd = document.getElementById('btn-md');
    if (btnMd) {
        btnMd.onclick = function() {
            if(!editor) return;
            const blob = new Blob([editor.value], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'kayler-doc.md';
            a.click();
        };
    }

    // [长图按钮]
    const btnLong = document.getElementById('btn-long-img');
    if (btnLong) {
        btnLong.onclick = function() {
            console.log("Click: Long Image");
            if (!preview) return;
            const content = preview.innerText;
            if (!content.trim()) {
                alert("内容为空，无法生成！");
                return;
            }
            localStorage.setItem('image_gen_content', content);
            window.location.href = 'index.html';
        };
    }

    // [复制源码]
    const btnCopyCode = document.getElementById('btn-copy-code');
    if(btnCopyCode && editor) {
        btnCopyCode.onclick = () => copyText(editor.value, btnCopyCode);
    }

    // [复制文本]
    const btnCopyText = document.getElementById('btn-copy-text');
    if(btnCopyText && preview) {
        btnCopyText.onclick = () => copyText(preview.innerText, btnCopyText);
    }

    // 同步滚动
    if(editor && preview) {
        editor.addEventListener('scroll', () => {
            const pct = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
            preview.scrollTop = pct * (preview.scrollHeight - preview.clientHeight);
        });
    }
});

// 辅助：复制
async function copyText(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const oldText = btn.innerText;
        btn.innerText = "✅";
        setTimeout(() => btn.innerText = oldText, 1000);
    } catch (e) {
        alert("复制失败，请手动复制");
    }
}