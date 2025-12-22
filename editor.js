// editor.js v6.2 - Core Logic & Publishing

// 将初始化函数挂载到 window，供 HTML 底部脚本调用
window.initEditor = function() {
    console.log("🔥 Editor.js v6.2 Initializing...");

    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const fileNameInput = document.getElementById('file-name-input');
    const btnSave = document.getElementById('btn-save');

    // === 1. 核心渲染逻辑 ===
    function renderMarkdown() {
        if (!editor || !preview) return;
        
        const rawText = editor.value;
        if (typeof marked !== 'undefined') {
            // 使用 marked 渲染 HTML
            const html = marked.parse(rawText);
            // 包装在 markdown-body 类中以应用样式
            preview.innerHTML = `<div class="markdown-body">${html}</div>`;
        } else {
            preview.innerHTML = `<pre>${rawText}</pre>`; 
        }
    }
    
    // 公开渲染函数供外部调用
    window.updatePreview = renderMarkdown;

    // === 2. 绑定输入事件 ===
    if (editor) {
        editor.addEventListener('input', () => {
            renderMarkdown();
            localStorage.setItem('kayler_editor_cache', editor.value);
            
            // 自动推断文件名 (如果用户没改过)
            // (可选功能，这里暂时注释掉，以免打扰用户手动输入)
            /*
            if (fileNameInput && fileNameInput.value === '新文档.md') {
                 const match = editor.value.match(/^#\s+(.*)$/m);
                 if (match) fileNameInput.value = match[1].trim() + ".md";
            }
            */
        });
    }

    // === 3. 检查管理员状态 (控制发布按钮) ===
    window.checkAdminStatus = function() {
        const token = localStorage.getItem('gh_token');
        if (btnSave) {
            if (token) {
                btnSave.disabled = false;
                btnSave.style.opacity = "1";
                btnSave.title = "点击发布到 GitHub";
                // 如果之前有 class 控制颜色，可以在这里切换
                btnSave.classList.remove('btn-disabled');
            } else {
                btnSave.disabled = true;
                btnSave.style.opacity = "0.5";
                btnSave.title = "需在设置中配置 Token";
                btnSave.classList.add('btn-disabled');
            }
        }
    };
    // 立即检查一次
    checkAdminStatus();
    
    // 监听全局认证事件 (layout.js 发出的)
    window.addEventListener('auth-updated', checkAdminStatus);


    // === 4. 按钮事件绑定 ===
    
    // [设置]
    bindClick('btn-setting', () => {
        if(window.openGlobalSettings) window.openGlobalSettings();
        else alert("正在加载设置组件...");
    });

    // [保存并发布]
    bindClick('btn-save', async () => {
        const token = localStorage.getItem('gh_token');
        const owner = localStorage.getItem('gh_owner');
        const repo = localStorage.getItem('gh_repo');

        if (!token || !owner || !repo) {
            alert("⚠️ 请先点击“设置”按钮配置 GitHub 权限！");
            if(window.openGlobalSettings) window.openGlobalSettings();
            return;
        }

        const content = editor.value;
        if(!content.trim()) { alert("内容为空，无法发布"); return; }

        let filename = fileNameInput ? fileNameInput.value.trim() : 'untitled.md';
        if(!filename.endsWith('.md')) filename += '.md';
        
        // 关键：为了配合 promptmaster，默认存到 prompt/ 目录
        // 如果文件名里已经包含了路径 (e.g. "folder/doc.md") 则不加
        let fullPath = filename;
        if (!fullPath.includes('/')) {
            fullPath = 'prompt/' + filename;
        }

        // UI 状态
        const originalHTML = btnSave.innerHTML;
        btnSave.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 发布中...';
        btnSave.disabled = true;

        try {
            await saveToGitHub(owner, repo, token, fullPath, content);
            
            btnSave.innerHTML = '<i class="fa-solid fa-check"></i> 成功';
            btnSave.style.backgroundColor = '#2ea44f'; // 绿色
            
            alert(`✅ 发布成功！\n文件已推送到: ${fullPath}\nCloudflare 将在几分钟内自动更新。`);

            setTimeout(() => {
                btnSave.innerHTML = originalHTML;
                btnSave.style.backgroundColor = '';
                btnSave.disabled = false;
            }, 3000);

        } catch (err) {
            console.error(err);
            alert("❌ 发布失败: " + err.message);
            btnSave.innerHTML = originalHTML;
            btnSave.disabled = false;
        }
    });

    // [PDF 导出] (全屏遮罩法 v3.4)
    bindClick('btn-pdf', () => {
        if (typeof html2pdf === 'undefined') {
            alert("PDF 组件加载中，请稍后再试...");
            return;
        }
        
        let author = "Kaylerris"; // 默认
        // 尝试从配置读取
        const owner = localStorage.getItem('gh_owner');
        if(owner) author = owner;

        const filename = (fileNameInput ? fileNameInput.value.replace('.md','') : 'document') + '.pdf';
        
        // 1. 创建临时容器
        const stage = document.createElement('div');
        stage.style.position = 'relative'; // [FIX] Use relative to expand body height
        stage.style.top = '0';
        stage.style.left = '0';
        stage.style.zIndex = '99999';
        stage.style.background = 'white';
        stage.style.width = '100%'; // 铺满
        stage.style.minHeight = '100vh';
        stage.style.padding = '40px';
        stage.style.color = 'black';
        stage.style.fontFamily = '"PingFang SC", sans-serif';

        // 2. 填充内容
        const header = `<div style="text-align:center; border-bottom:2px solid #333; padding-bottom:10px; margin-bottom:20px; font-size:18px; font-weight:bold;">Kayler 在线文档</div>`;
        const body = `<div class="markdown-body">${marked.parse(editor.value)}</div>`;
        const footer = `<div style="margin-top:50px; text-align:center; color:#666; font-size:12px; border-top:1px solid #eee; padding-top:10px;">Created by @${author} with x.aisai.cc</div>`;
        
        stage.innerHTML = header + body + footer;
        
        // 3. 挂载并生成
        document.body.appendChild(stage);
        document.body.classList.add('export-mode'); // 允许滚动
        window.scrollTo(0, 0);

        const opt = {
            margin: 15,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // [FIX] Add delay to ensure layout paint
        setTimeout(() => {
            html2pdf().set(opt).from(stage).save().then(() => {
                document.body.removeChild(stage);
                document.body.classList.remove('export-mode');
            });
        }, 100);
    });

    // [.md 下载]
    bindClick('btn-md', () => {
        if(!editor.value) return;
        const blob = new Blob([editor.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (fileNameInput ? fileNameInput.value : 'doc') + (fileNameInput.value.endsWith('.md') ? '' : '.md');
        a.click();
    });

    // [长图]
    bindClick('btn-long-img', () => {
        const txt = preview.innerText; // 获取纯文本
        if (!txt.trim()) { alert("内容为空"); return; }
        localStorage.setItem('kayler_draft', txt);
        window.location.href = 'index.html';
    });

    // [复制]
    bindClick('btn-copy-code', () => copyText(editor.value, document.getElementById('btn-copy-code')));
    bindClick('btn-copy-text', () => copyText(preview.innerText, document.getElementById('btn-copy-text')));

    console.log("✅ Editor initialized.");
};

// 自动执行 (如果 HTML 底部没写 initEditor 调用)
document.addEventListener('DOMContentLoaded', () => {
    // 检查 HTML 里是否已经手动调用了。如果没有，这里兜底调用。
    // 但因为我们在 HTML 底部写了脚本，这里可以留空，或者作为双重保险。
    if (document.getElementById('editor').value === '') {
         // window.initEditor(); 
    }
});


// === 辅助函数 ===

function bindClick(id, handler) {
    const el = document.getElementById(id);
    if(el) el.onclick = handler;
}

async function copyText(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const oldHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> 已复制';
        setTimeout(() => btn.innerHTML = oldHTML, 1500);
    } catch(e) { alert("复制失败"); }
}

// GitHub API 上传函数
async function saveToGitHub(owner, repo, token, path, content) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    // 1. 检查是否存在
    let sha = null;
    const checkRes = await fetch(url, { headers: { 'Authorization': `token ${token}` } });
    if (checkRes.ok) {
        const data = await checkRes.json();
        sha = data.sha;
        if(!confirm(`文件 ${path} 已存在，是否覆盖？`)) throw new Error("取消上传");
    }

    // 2. 上传
    const contentBase64 = btoa(unescape(encodeURIComponent(content)));
    const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `Update ${path} via Kayler Editor`,
            content: contentBase64,
            sha: sha
        })
    });

    if (!putRes.ok) {
        const err = await putRes.json();
        throw new Error(err.message);
    }
}