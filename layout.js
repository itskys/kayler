// === Kayler 全站核心脚本 v5.0 (UI统一 + 权限中心) ===

document.addEventListener('DOMContentLoaded', () => {
    checkMagicLogin(); // 1. 检查魔法链接
    injectStyles();    // 2. 注入样式
    injectHeader();    // 3. 注入/替换导航
    injectFooter();    // 4. 注入/替换页脚
    injectAuthModal(); // 5. 注入设置弹窗
    highlightCurrentNav();
});

// === 1. 智能导航栏 (自动高亮) ===
function injectHeader() {
    const existingNav = document.querySelector('nav.top-nav');
    
    // 创建新的导航结构
    const navHTML = `
        <div class="top-nav-inner">
            <a href="index.html" class="nav-link">🏠 卡片生成器</a>
            <a href="editor.html" class="nav-link">📝 在线编辑器</a>
            <a href="promptmaster.html" class="nav-link">💡 提示词管理器</a>
            <a href="aiGallery.html" class="nav-link">🖼️ AI图片展</a>
            <a href="contact.html" class="nav-link">📩 联系博主</a>
        </div>
    `;

    if (existingNav) {
        // 如果页面已有导航标签（如编辑器），原地替换内容以保持布局位置
        existingNav.innerHTML = navHTML;
        existingNav.classList.add('global-top-nav'); // 确保应用全局样式
    } else {
        // 如果页面没有导航，插入到 body 最前面
        const nav = document.createElement('nav');
        nav.className = 'top-nav global-top-nav';
        nav.innerHTML = navHTML;
        document.body.insertAdjacentElement('afterbegin', nav);
    }
}

// === 2. 智能页脚 (自适应紧凑模式) ===
function injectFooter() {
    const existingFooter = document.querySelector('footer');
    const isEditor = window.location.pathname.includes('editor'); // 检测是否是编辑器
    
    // 根据页面类型决定页脚样式
    const footerClass = isEditor ? 'global-footer compact' : 'global-footer';
    const adminText = localStorage.getItem('gh_token') ? "✅ 管理员已登录" : "⚙️ 管理员配置";
    
    const footerContent = `
        <p>
            &copy; 2025 Kaylerris 保留所有权利.
            <a onclick="openGlobalSettings()" class="footer-admin-link">${adminText}</a>
        </p>
    `;

    if (existingFooter) {
        // 原地替换
        existingFooter.className = footerClass; // 覆盖原有类名
        existingFooter.innerHTML = footerContent;
    } else {
        // 插入到底部
        const footer = document.createElement('footer');
        footer.className = footerClass;
        footer.innerHTML = footerContent;
        document.body.appendChild(footer);
    }
}

// === 3. 全局设置弹窗 (HTML) ===
function injectAuthModal() {
    if (document.getElementById('global-settings-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'global-settings-modal';
    modal.onclick = (e) => { if(e.target === modal) closeGlobalSettings(); };
    modal.innerHTML = `
        <div class="gsm-content">
            <span class="gsm-close" onclick="closeGlobalSettings()">&times;</span>
            <h3 style="margin-top:0; color:#333;">⚙️ 全站配置</h3>
            <p style="font-size:12px; color:#666; margin-bottom:20px;">配置 GitHub Token 以解锁编辑器发布、画廊无限加载等功能。</p>
            
            <div class="gsm-field">
                <label>GitHub 用户名 (Owner)</label>
                <input type="text" id="gsm-owner" placeholder="例如: itskys">
            </div>
            <div class="gsm-field">
                <label>仓库名 (Repo)</label>
                <input type="text" id="gsm-repo" placeholder="例如: kayler">
            </div>
            <div class="gsm-field">
                <label>Token (需 repo 权限)</label>
                <input type="password" id="gsm-token" placeholder="******** (留空不修改)">
            </div>
            
            <div style="text-align:right; margin-top:20px; border-bottom:1px solid #eee; padding-bottom:20px;">
                <button class="gsm-btn" onclick="closeGlobalSettings()" style="background:#f5f5f5; color:#666;">取消</button>
                <button class="gsm-btn gsm-primary" onclick="saveGlobalSettings()">保存配置</button>
            </div>

            <div style="margin-top:15px;">
                <button class="gsm-btn gsm-magic" onclick="generateGlobalMagicLink()">⚡ 生成跨设备登录链接</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// === 4. 样式注入 (CSS) ===
function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* 导航栏 */
        .global-top-nav {
            background: white !important; border-bottom: 1px solid #eee !important;
            height: 50px !important; width: 100% !important;
            display: flex !important; justify-content: center !important; z-index: 1000 !important;
            flex-shrink: 0 !important;
        }
        .top-nav-inner {
            width: 94%; max-width: 1600px; display: flex; justify-content: flex-end; align-items: center; gap: 20px;
        }
        .nav-link {
            text-decoration: none !important; color: #666 !important; font-size: 15px !important; font-weight: 600 !important;
            display: flex !important; align-items: center !important; gap: 5px !important; transition: 0.2s !important;
        }
        .nav-link:hover, .nav-link.active { color: #8b5e3c !important; }

        /* 页脚 (标准版) */
        .global-footer {
            margin-top: auto; padding: 30px 0; border-top: 1px solid #eee;
            width: 100%; text-align: center; color: #999; font-size: 13px;
            background: white; flex-shrink: 0;
        }
        /* 页脚 (紧凑版 - 专为编辑器设计) */
        .global-footer.compact {
            padding: 0 !important; height: 36px !important; display: flex !important; align-items: center !important; justify-content: center !important;
            font-size: 12px !important; border-top: 1px solid #ddd !important;
        }
        
        .footer-admin-link { margin-left: 10px; color: #ccc; cursor: pointer; text-decoration: none; transition: 0.2s; }
        .footer-admin-link:hover { color: #8b5e3c; text-decoration: underline; }

        /* 弹窗样式 */
        #global-settings-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99999; justify-content: center; align-items: center; }
        .gsm-content { background: white; padding: 25px; border-radius: 12px; width: 380px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative; font-family: sans-serif; }
        .gsm-close { position: absolute; top: 15px; right: 15px; font-size: 24px; cursor: pointer; color: #999; }
        .gsm-close:hover { color: #333; }
        .gsm-field { margin-bottom: 12px; }
        .gsm-field label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 4px; color: #555; }
        .gsm-field input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .gsm-btn { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-left: 10px; transition: 0.2s; }
        .gsm-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .gsm-primary { background: #8b5e3c; color: white; }
        .gsm-magic { width: 100%; margin: 0; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    `;
    document.head.appendChild(style);
}

// === 5. 逻辑功能 ===
function highlightCurrentNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (path.includes(href) || (path === '/' && href === 'index.html')) link.classList.add('active');
    });
}

function checkMagicLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('gh_key')) {
        try {
            const rawData = atob(decodeURIComponent(urlParams.get('gh_key')));
            const config = JSON.parse(rawData);
            if (config.t) {
                localStorage.setItem('gh_token', config.t);
                if(config.o) localStorage.setItem('gh_owner', config.o);
                if(config.r) localStorage.setItem('gh_repo', config.r);
                alert(`🎉 欢迎回来！管理员 ${config.o || ''} 验证成功。`);
                const newUrl = window.location.href.split('?')[0];
                window.history.replaceState({}, '', newUrl);
                window.location.reload();
            }
        } catch (e) { console.error(e); }
    }
}

// === 公共 API 供页面调用 ===
window.openGlobalSettings = function() {
    document.getElementById('gsm-owner').value = localStorage.getItem('gh_owner') || 'itskys';
    document.getElementById('gsm-repo').value = localStorage.getItem('gh_repo') || 'kayler';
    const token = localStorage.getItem('gh_token');
    const tokenInput = document.getElementById('gsm-token');
    if(token) { tokenInput.placeholder = "******** (已配置)"; tokenInput.value = ""; }
    else { tokenInput.placeholder = "github_pat_..."; tokenInput.value = ""; }
    document.getElementById('global-settings-modal').style.display = 'flex';
}

window.closeGlobalSettings = function() {
    document.getElementById('global-settings-modal').style.display = 'none';
}

window.saveGlobalSettings = function() {
    const owner = document.getElementById('gsm-owner').value.trim();
    const repo = document.getElementById('gsm-repo').value.trim();
    const token = document.getElementById('gsm-token').value.trim();
    
    if(owner) localStorage.setItem('gh_owner', owner);
    if(repo) localStorage.setItem('gh_repo', repo);
    if(token) localStorage.setItem('gh_token', token);
    
    alert('✅ 配置已保存，全站生效！');
    closeGlobalSettings();
    window.location.reload(); // 刷新以应用新权限
}

window.generateGlobalMagicLink = function() {
    const owner = localStorage.getItem('gh_owner') || document.getElementById('gsm-owner').value.trim();
    const repo = localStorage.getItem('gh_repo') || document.getElementById('gsm-repo').value.trim();
    const token = localStorage.getItem('gh_token') || document.getElementById('gsm-token').value.trim();
    
    if(!token) { alert("请先保存 Token！"); return; }
    
    const config = { o: owner, r: repo, t: token };
    const encoded = encodeURIComponent(btoa(JSON.stringify(config)));
    const magicUrl = `${window.location.origin}/index.html?gh_key=${encoded}`;
    
    navigator.clipboard.writeText(magicUrl).then(() => alert("🔗 通用登录链接已复制！\n发送到任意设备打开即可登录。"));
}