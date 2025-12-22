// === Kayler 全站核心脚本 v6.0 (UI统一 + 权限中心) ===

document.addEventListener('DOMContentLoaded', () => {
    checkMagicLogin(); // 1. 检查魔法链接
    injectStyles();    // 2. 注入全局样式
    injectHeader();    // 3. 注入导航栏
    injectFooter();    // 4. 注入页脚
    injectAuthModal(); // 5. 注入设置弹窗
    highlightCurrentNav();
});

// === 1. 魔法链接自动登录 ===
function checkMagicLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('gh_key')) {
        try {
            const rawData = atob(decodeURIComponent(urlParams.get('gh_key')));
            const config = JSON.parse(rawData);
            if (config.t) {
                localStorage.setItem('gh_token', config.t);
                localStorage.setItem('gh_owner', config.o || '');
                localStorage.setItem('gh_repo', config.r || '');
                alert(`🎉 欢迎回来！\n管理员身份验证成功。\n全站功能已解锁。`);
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({path:newUrl}, '', newUrl);
                window.dispatchEvent(new Event('auth-updated'));
            }
        } catch (e) { console.error('Magic link error', e); }
    }
}

// === 2. 注入全局样式 ===
function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --font-stack: "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif; --brand-brown: #8b5e3c; }
        
        /* 导航栏样式 */
        .global-top-nav {
            background: white !important; border-bottom: 1px solid #eee !important;
            height: 50px !important; width: 100% !important;
            display: flex !important; justify-content: center !important;
            position: relative !important; z-index: 1000 !important; flex-shrink: 0 !important;
        }
        .global-nav-inner {
            width: 94%; max-width: 1600px; display: flex; justify-content: flex-end; align-items: center; gap: 20px;
        }
        .global-nav-link {
            text-decoration: none !important; color: #666 !important; font-size: 15px !important; font-weight: 600 !important;
            display: flex !important; align-items: center !important; gap: 5px !important; transition: 0.2s !important; font-family: var(--font-stack) !important;
        }
        .global-nav-link:hover, .global-nav-link.active { color: var(--brand-brown) !important; }

        /* 页脚样式 */
        .global-footer {
            margin-top: auto !important; padding: 30px 0 !important; border-top: 1px solid #eee !important;
            width: 100% !important; text-align: center !important; color: #999 !important; font-size: 13px !important;
            background: white !important; flex-shrink: 0 !important; padding-bottom: 40px !important;
            font-family: var(--font-stack) !important;
        }
        .global-footer.compact {
            padding: 0 !important; height: 36px !important; display: flex !important; align-items: center !important; justify-content: center !important;
            font-size: 12px !important; border-top: 1px solid #ddd !important;
        }
        .footer-admin-link { margin-left: 10px; color: #ccc; cursor: pointer; text-decoration: none; transition: 0.2s; }
        .footer-admin-link:hover { color: var(--brand-brown); text-decoration: underline; }

        /* 全局设置弹窗 */
        #global-settings-modal {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 99999; justify-content: center; align-items: center;
        }
        .gsm-content {
            background: white; padding: 30px; border-radius: 12px; width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2); font-family: var(--font-stack); position: relative;
        }
        .gsm-close { position: absolute; top: 15px; right: 15px; font-size: 24px; cursor: pointer; color: #999; }
        .gsm-field { margin-bottom: 15px; }
        .gsm-label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 5px; color: #555; }
        .gsm-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .gsm-btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; }
        .gsm-btn-primary { background: #8b5e3c; color: white; margin-left: 10px; }
        .gsm-btn-magic { width: 100%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; margin-top: 20px; }
        
        @media (max-width: 768px) {
            .global-nav-inner { justify-content: flex-start !important; overflow-x: auto !important; padding: 0 10px !important; gap: 15px !important; }
            .global-nav-link { font-size: 14px !important; flex-shrink: 0 !important; }
        }
    `;
    document.head.appendChild(style);
}

// === 3. 注入导航栏 (核心修改：AI画廊) ===
function injectHeader() {
    const existingNav = document.querySelector('nav.top-nav');
    const navHTML = `
        <div class="global-nav-inner">
            <a href="index.html" class="global-nav-link">🏠 卡片生成器</a>
            <a href="editor.html" class="global-nav-link">📝 在线编辑器</a>
            <a href="promptmaster.html" class="global-nav-link">💡 提示词管理器</a>
            <a href="aiGallery.html" class="global-nav-link">🖼️ AI 画廊</a>
            <a href="https://github.com/itskys" target="_blank" class="global-nav-link">📩 联系博主</a>
        </div>
    `;
    if (existingNav) { existingNav.innerHTML = navHTML; existingNav.classList.add('global-top-nav'); } 
    else {
        const nav = document.createElement('nav');
        nav.className = 'top-nav global-top-nav';
        nav.innerHTML = navHTML;
        document.body.insertAdjacentElement('afterbegin', nav);
    }
}

// === 4. 注入页脚 ===
function injectFooter() {
    const existingFooter = document.querySelector('footer');
    const isEditor = window.location.pathname.includes('editor'); 
    const footerClass = isEditor ? 'global-footer compact' : 'global-footer';
    const isLogged = localStorage.getItem('gh_token');
    const adminText = isLogged ? "✅ 管理员已登录" : "⚙️ 管理员配置";
    
    const footerContent = `<p>&copy; 2025 Kaylerris 保留所有权利.<a onclick="openGlobalSettings()" class="footer-admin-link" id="footerAdminLink">${adminText}</a></p>`;

    if (existingFooter) { existingFooter.className = footerClass; existingFooter.innerHTML = footerContent; } 
    else {
        const footer = document.createElement('footer');
        footer.className = footerClass; footer.innerHTML = footerContent;
        document.body.appendChild(footer);
    }
}

// === 5. 注入设置弹窗 ===
function injectAuthModal() {
    if (document.getElementById('global-settings-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'global-settings-modal';
    modal.onclick = (e) => { if(e.target === modal) closeGlobalSettings(); };
    modal.innerHTML = `
        <div class="gsm-content">
            <span class="gsm-close" onclick="closeGlobalSettings()">&times;</span>
            <h3 style="margin-top:0; color:#333;">⚙️ 全站配置</h3>
            <p style="font-size:12px; color:#666; margin-bottom:20px;">配置 GitHub Token 解锁高级功能。</p>
            <div class="gsm-field"><label class="gsm-label">GitHub 用户名</label><input type="text" id="gsm-owner" class="gsm-input" placeholder="itskys"></div>
            <div class="gsm-field"><label class="gsm-label">仓库名</label><input type="text" id="gsm-repo" class="gsm-input" placeholder="kayler"></div>
            <div class="gsm-field"><label class="gsm-label">Token</label><input type="password" id="gsm-token" class="gsm-input" placeholder="********"></div>
            <div style="text-align:right; border-bottom:1px solid #eee; padding-bottom:20px;">
                <button onclick="closeGlobalSettings()" class="gsm-btn" style="background:#f5f5f5; color:#666;">取消</button>
                <button onclick="saveGlobalSettings()" class="gsm-btn gsm-btn-primary">保存配置</button>
            </div>
            <div style="margin-top:15px;"><button class="gsm-btn gsm-btn-magic" onclick="generateGlobalMagicLink()">⚡ 生成跨设备登录链接</button></div>
        </div>`;
    document.body.appendChild(modal);
}

// === 全局函数 ===
window.openGlobalSettings = function() {
    document.getElementById('gsm-owner').value = localStorage.getItem('gh_owner') || 'itskys';
    document.getElementById('gsm-repo').value = localStorage.getItem('gh_repo') || 'kayler';
    document.getElementById('gsm-token').value = '';
    document.getElementById('gsm-token').placeholder = localStorage.getItem('gh_token') ? "******** (已配置)" : "ghp_...";
    document.getElementById('global-settings-modal').style.display = 'flex';
}
window.closeGlobalSettings = function() { document.getElementById('global-settings-modal').style.display = 'none'; }
window.saveGlobalSettings = function() {
    const owner = document.getElementById('gsm-owner').value.trim();
    const repo = document.getElementById('gsm-repo').value.trim();
    const token = document.getElementById('gsm-token').value.trim();
    if(owner) localStorage.setItem('gh_owner', owner);
    if(repo) localStorage.setItem('gh_repo', repo);
    if(token) localStorage.setItem('gh_token', token);
    
    alert('✅ 配置已保存！');
    closeGlobalSettings();
    const link = document.getElementById('footerAdminLink');
    if(link) link.innerText = "✅ 管理员已登录";
    window.dispatchEvent(new Event('auth-updated'));
    window.location.reload();
}
window.generateGlobalMagicLink = function() {
    const o = document.getElementById('gsm-owner').value.trim() || localStorage.getItem('gh_owner');
    const r = document.getElementById('gsm-repo').value.trim() || localStorage.getItem('gh_repo');
    const t = document.getElementById('gsm-token').value.trim() || localStorage.getItem('gh_token');
    if(!t) { alert("请先保存 Token！"); return; }
    const config = { o, r, t };
    const encoded = encodeURIComponent(btoa(JSON.stringify(config)));
    const magicUrl = `${window.location.origin}/index.html?gh_key=${encoded}`;
    navigator.clipboard.writeText(magicUrl).then(() => alert("🔗 链接已复制！"));
}
function highlightCurrentNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.global-nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (path.includes(href) || (path === '/' && href === 'index.html')) link.classList.add('active');
    });
}