// editor.js v6.1 - Real Publishing Implemented

window.addEventListener('load', () => {
    console.log("🔥 Editor.js v6.1 Loaded & Ready");

    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const fileNameInput = document.getElementById('file-name-input');

    // === 1. 初始化渲染 ===
    function renderMarkdown() {
        if (!editor || !preview) return;
        if (typeof marked !== 'undefined') {
            preview.innerHTML = marked.parse(editor.value);
        } else {
            preview.innerHTML = editor.value; 
        }
    }

    if (editor) {
        // 恢复草稿
        const saved = localStorage.getItem('editor_draft');
        if (saved) editor.value = saved;
        else if (typeof DEFAULT_EDITOR_CONTENT !== 'undefined') editor.value = DEFAULT_EDITOR_CONTENT;
        
        editor.addEventListener('input', () => {
            renderMarkdown();
            localStorage.setItem('editor_draft', editor.value);
        });
        renderMarkdown();
    }

    // === 2. 真实发布逻辑 (GitHub API) ===
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.onclick = async function() {
            // 1. 检查配置
            const token = localStorage.getItem('gh_token');
            const owner = localStorage.getItem('gh_owner');
            const repo = localStorage.getItem('gh_repo');

            if (!token || !owner || !repo) {
                if(confirm("⚠️ 未配置 GitHub 权限，无法发布。\n是否前往设置？")) {
                    if(window.openGlobalSettings) window.openGlobalSettings();
                }
                return;
            }

            // 2. 获取文件名和内容
            let filename = fileNameInput ? fileNameInput.value.trim() : 'untitled.md';
            if(!filename.endsWith('.md')) filename += '.md';
            
            // 为了整洁，可以默认存到 prompt/ 目录，或者直接存根目录
            // 这里直接使用根目录，或者你可以改成 `prompt/${filename}`
            const filePath = filename; 

            const content = editor.value;
            if(!content) { alert("内容为空，无法发布"); return; }

            // 3. UI 状态：发布中
            const originalText = btnSave.innerHTML;
            btnSave.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 发布中...';
            btnSave.disabled = true;

            try {
                await saveToGitHub(owner, repo, token, filePath, content);
                btnSave.innerHTML = '<i class="fa-solid fa-check"></i> 发布成功';
                btnSave.style.background = '#1a7f37';
                setTimeout(() => {
                    btnSave.innerHTML = originalText;
                    btnSave.disabled = false;
                    btnSave.style.background = '';
                }, 3000);
            } catch (err) {
                console.error(err);
                alert("❌ 发布失败: " + err.message);
                btnSave.innerHTML = originalText;
                btnSave.disabled = false;
            }
        };
    }

    // --- GitHub API Helper ---
    async function saveToGitHub(owner, repo, token, path, content) {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        
        // 1. 检查文件是否存在 (获取 SHA 以便更新)
        let sha = null;
        try {
            const checkRes = await fetch(url, {
                headers: { 'Authorization': `token ${token}` }
            });
            if (checkRes.ok) {
                const data = await checkRes.json();
                sha = data.sha;
                console.log("File exists, updating. SHA:", sha);
            }
        } catch (e) { /* Ignore network errors here */ }

        // 2. Base64 编码 (解决中文乱码)
        // btoa 不能直接处理 Unicode，需要 encodeURIComponent 转换
        const contentBase64 = btoa(unescape(encodeURIComponent(content)));

        // 3. PUT 请求
        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update ${path} via Kayler Editor`,
                content: contentBase64,
                sha: sha // 如果是新建文件，sha 为 null
            })
        });

        if (!putRes.ok) {
            const errData = await putRes.json();
            throw new Error(errData.message || "GitHub API Error");
        }
    }

    // === 3. 其他按钮 ===
    
    // 设置
    bindClick('btn-setting', () => {
        if(window.openGlobalSettings) window.openGlobalSettings();
        else alert("设置面板正在加载...");
    });

    // PDF
    bindClick('btn-pdf', () => window.print());

    // .md 下载
    bindClick('btn-md', () => {
        if(!editor) return;
        const blob = new Blob([editor.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (fileNameInput ? fileNameInput.value : 'doc') + '.md';
        a.click();
    });

    // 长图
    bindClick('btn-long-img', () => {
        if (!preview) return;
        const txt = preview.innerText;
        if (!txt.trim()) { alert("内容为空"); return; }
        localStorage.setItem('image_gen_content', txt);
        window.location.href = 'index.html';
    });

    // 复制
    bindClick('btn-copy-code', () => copyText(editor.value, document.getElementById('btn-copy-code')));
    bindClick('btn-copy-text', () => copyText(preview.innerText, document.getElementById('btn-copy-text')));
});

// 辅助函数
function bindClick(id, handler) {
    const el = document.getElementById(id);
    if(el) el.onclick = handler;
}

async function copyText(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const old = btn.innerText;
        btn.innerText = "✅";
        setTimeout(() => btn.innerText = old, 1000);
    } catch(e) { alert("复制失败"); }
}