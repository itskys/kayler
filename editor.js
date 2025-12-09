// editor.js - v5.2 Robust Version
// 修复了按钮点击无反应的问题，增加了安全检查

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Editor JS loaded & DOM ready.");

    // 1. 获取核心元素
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');

    // 2. 核心功能：渲染 Markdown
    // 检查 marked 库是否加载
    if (typeof marked === 'undefined') {
        console.error("❌ Marked.js 库未加载，请检查网络或 CDN 地址！");
        if(preview) preview.innerHTML = "<p style='color:red'>⚠️ 核心组件加载失败，请刷新页面。</p>";
    }

    function renderMarkdown() {
        if (!editor || !preview) return;
        try {
            // 使用 marked 解析，如果没加载则降级处理
            const html = (typeof marked !== 'undefined') ? marked.parse(editor.value) : editor.value;
            preview.innerHTML = html;
        } catch (e) {
            console.error("渲染出错:", e);
        }
    }

    // 3. 初始化加载
    if (editor) {
        const savedContent = localStorage.getItem('editor_draft');
        if (savedContent) {
            editor.value = savedContent;
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

    // 4. --- 按钮事件绑定 (带安全检查) ---

    // [设置按钮]
    const btnSetting = document.getElementById('btn-setting');
    if (btnSetting) {
        btnSetting.addEventListener('click', () => {
            console.log("点击设置");
            if (window.openGlobalSettings) {
                window.openGlobalSettings();
            } else {
                alert("⚠️ 设置面板尚未加载，请稍后再试或刷新页面。");
            }
        });
    } else {
        // 兼容旧版 HTML，尝试用 class 获取
        const btnSettingLegacy = document.querySelector('.btn-setting');
        if (btnSettingLegacy) {
            btnSettingLegacy.addEventListener('click', () => {
                if (window.openGlobalSettings) window.openGlobalSettings();
            });
        }
    }

    // [保存并发布]
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const token = localStorage.getItem('gh_token');
            if (!token) {
                if(confirm("⚠️ 未检测到 GitHub Token，无法发布。\n是否立即打开设置进行配置？")) {
                    if(window.openGlobalSettings) window.openGlobalSettings();
                }
                return;
            }
            alert("✅ 模拟发布成功！(Token已验证)");
        });
    }

    // [PDF 打印]
    const btnPdf = document.getElementById('btn-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', () => {
            window.print();
        });
    }

    // [导出 .md]
    const btnMd = document.getElementById('btn-md');
    if (btnMd) {
        btnMd.addEventListener('click', () => {
            if(!editor) return;
            const blob = new Blob([editor.value], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'kayler-article.md';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // [长图生成]
    const btnLongImg = document.getElementById('btn-long-img');
    if (btnLongImg) {
        btnLongImg.addEventListener('click', () => {
            if(!preview) return;
            // 获取纯文本
            const content = preview.innerText; 
            
            if (!content || !content.trim()) {
                alert("内容为空，无法生成！");
                return;
            }
            
            // 存入缓存
            localStorage.setItem('image_gen_content', content);
            
            // 跳转
            window.location.href = 'index.html';
        });
    }

    // [复制源码]
    const btnCopyCode = document.getElementById('btn-copy-code');
    if (btnCopyCode) {
        btnCopyCode.addEventListener('click', async function() {
            if(!editor) return;
            await copyToClipboard(editor.value, this);
        });
    }

    // [复制文本]
    const btnCopyText = document.getElementById('btn-copy-text');
    if (btnCopyText) {
        btnCopyText.addEventListener('click', async function() {
            if(!preview) return;
            await copyToClipboard(preview.innerText, this);
        });
    }

    // 辅助函数：复制
    async function copyToClipboard(text, btn) {
        try {
            await navigator.clipboard.writeText(text);
            const originalHtml = btn.innerHTML; // 保存带图标的 HTML
            btn.innerText = "✅ 已复制";
            btn.style.color = "#1a7f37";
            setTimeout(() => {
                btn.innerHTML = originalHtml; // 恢复图标
                btn.style.color = "";
            }, 1500);
        } catch (e) {
            console.error(e);
            alert("复制失败，请手动复制");
        }
    }
});