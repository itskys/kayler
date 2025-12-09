// === Kayler 全站核心脚本 v4.0 (布局 + 身份验证中心) ===

document.addEventListener('DOMContentLoaded', () => {
    checkMagicLogin(); // 1. 优先处理魔法链接
    injectStyles();    // 2. 注入全局样式
    injectHeader();    // 3. 注入导航栏
    injectFooter();    // 4. 注入页脚
    injectAuthModal(); // 5. 注入全局设置弹窗
    highlightCurrentNav();
});

// === 1. 魔法链接自动登录 ===
function checkMagicLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('gh_key')) {
        try {
            const rawData = atob(urlParams.get('gh_key'));
            const config = JSON.parse(rawData);
            if (config.t) {
                localStorage.setItem('gh_token', config.t);
                localStorage.setItem('gh_owner', config.o || '');
                localStorage.setItem('gh_repo', config.r || '');
                alert(`🎉 欢迎回来！\n管理员身份验证成功。\n全站功能已解锁。`);
                // 清理 URL
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({path:newUrl}, '', newUrl);
                // 广播登录成功事件
                window.dispatchEvent(new Event('auth-updated'));
            }
        } catch (e) {
            console.error('Magic link error', e);
            alert('❌ 链接无效');
        }
    }
}

// === 2. 注入全局样式 ===
function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --font-stack: "PingFang SC", sans-serif; --brand-brown: #8b5e3c; }
        
        /* 导航栏 */
        .global-top-nav {
            background: white !important; border-bottom: 1px solid #eee !important;
            height: 50px !important; width: 100% !important;
            display: flex !important; justify-content: center !important;
            position: relative !important; z-index: 1000 !important;
        }
        .global-nav-inner {
            width: 94%; max-width: 1600px; display: flex; justify-content: flex-end; align-items: center; gap: 20px;
        }
        .global-nav-link {
            text-decoration: none !important; color: #666 !important; font-size: 15px !important; font-weight: 600 !important;
            display: flex !important; align-items: center !important; gap: 5px !important; transition: 0.2s !important;
        }
        .global-nav-link:hover, .global-nav-link.active { color: var(--brand-brown) !important; }

        /* 页脚 */
        .global-footer {
            margin-top: auto !important; padding: 30px 0 !important; border-top: 1px solid #eee !important;
            width: 100% !important; text-align: center !important; color: #999 !important; font-size: 13px !important;
            background: white !important; flex-shrink: 0 !important; padding-bottom: 40px !important;
        }
        .admin-trigger { cursor: pointer; margin-left: 10px; color: #ddd; text-decoration: none; transition: 0.2s; }
        .admin-trigger:hover { color: var(--brand-brown); text-decoration: underline; }

        /* 全局设置弹窗 */
        #global-settings-modal {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); z-index: 99999; justify-content: center; align-items: center;
        }
        .gsm-content {
            background: white; padding: 30px; border-radius: 12px; width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2); font-family: var(--font-stack);
        }
        .gsm-field { margin-bottom: 15px; }
        .gsm-label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 5px; color: #555; }
        .gsm-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .gsm-btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .gsm-btn-primary { background: #8b5e3c; color: white; }
        .gsm-btn-magic { width: 100%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; margin-top: 20px; }
    `;
    document.head.appendChild(style);
}

// === 3. 注入导航栏 ===
function injectHeader() {
    const old = document.querySelector('nav.top-nav'); if (old) old.remove();
    const nav = document.createElement('nav');
    nav.className = 'global-top-nav';
    nav.innerHTML = `
        <div class="global-nav-inner">
            <a href="index.html" class="global-nav-link">🏠 卡片生成器</a>
            <a href="editor.html" class="global-nav-link">📝 在线编辑器</a>
            <a href="promptmaster.html" class="global-nav-link">💡 提示词管理器</a>
            <a href="aiGallery.html" class="global-nav-link">🖼️ AI图片展</a>
            <a href="contact.html" class="global-nav-link">📩 联系博主</a>
        </div>
    `;
    document.body.insertAdjacentElement('afterbegin', nav);
}

// === 4. 注入页脚 (含管理员入口) ===
function injectFooter() {
    const old = document.querySelector('footer'); if (old) old.remove();
    const footer = document.createElement('footer');
    footer.className = 'global-footer';
    // 自动判断是否已登录，改变文字
    const isLogged = localStorage.getItem('gh_token');
    const adminText = isLogged ? "✅ 管理员已登录" : "⚙️ 管理员配置";
    
    footer.innerHTML = `
        <p>
            &copy; 2025 Kaylerris 保留所有权利.
            <a onclick="openGlobalSettings()" class="admin-trigger" id="footerAdminLink">${adminText}</a>
        </p>
    `;
    document.body.appendChild(footer);
}

// === 5. 注入设置弹窗 (全站通用) ===
function injectAuthModal() {
    const div = document.createElement('div');
    div.id = 'global-settings-modal';
    div.onclick = (e) => { if(e.target === div) closeGlobalSettings(); };
    div.innerHTML = `
        <div class="gsm-content">
            <h3 style="margin-top:0; color:#333;">⚙️ 全站管理员配置</h3>
            <p style="font-size:12px; color:#666; margin-bottom:20px;">配置一次，全站通用 (编辑器、画廊、提示词库)。</p>
            
            <div class="gsm-field">
                <label class="gsm-label">GitHub 用户名</label>
                <input type="text" id="gsm-owner" class="gsm-input">
            </div>
            <div class="gsm-field">
                <label class="gsm-label">仓库名</label>
                <input type="text" id="gsm-repo" class="gsm-input">
            </div>
            <div class="gsm-field">
                <label class="gsm-label">Token (Repo 权限)</label>
                <input type="password" id="gsm-token" class="gsm-input" placeholder="github_pat_...">
            </div>

            <div style="text-align:right; border-bottom:1px solid #eee; padding-bottom:20px;">
                <button onclick="closeGlobalSettings()" class="gsm-btn" style="background:#eee; margin-right:10px;">取消</button>
                <button onclick="saveGlobalSettings()" class="gsm-btn gsm-btn-primary">保存配置</button>
            </div>

            <button class="gsm-btn gsm-btn-magic" onclick="generateGlobalMagicLink()">⚡ 生成跨设备“魔法登录链接”</button>
        </div>
    `;
    document.body.appendChild(div);
}

// === 公共方法 ===
window.openGlobalSettings = function() {
    document.getElementById('gsm-owner').value = localStorage.getItem('gh_owner') || 'itskys';
    document.getElementById('gsm-repo').value = localStorage.getItem('gh_repo') || 'kayler';
    document.getElementById('gsm-token').value = localStorage.getItem('gh_token') || '';
    document.getElementById('global-settings-modal').style.display = 'flex';
}

window.closeGlobalSettings = function() {
    document.getElementById('global-settings-modal').style.display = 'none';
}

window.saveGlobalSettings = function() {
    const owner = document.getElementById('gsm-owner').value.trim();
    const repo = document.getElementById('gsm-repo').value.trim();
    const token = document.getElementById('gsm-token').value.trim();
    
    if(!token) { alert("Token 不能为空"); return; }
    
    localStorage.setItem('gh_owner', owner);
    localStorage.setItem('gh_repo', repo);
    localStorage.setItem('gh_token', token);
    
    alert('✅ 配置已保存！全站已生效。');
    closeGlobalSettings();
    
    // 更新页脚状态
    const link = document.getElementById('footerAdminLink');
    if(link) link.innerText = "✅ 管理员已登录";

    // 触发自定义事件，通知页面刷新状态
    window.dispatchEvent(new Event('auth-updated'));
    
    // 如果是画廊或提示词页，可能需要刷新列表
    if(typeof fetchRepoData === 'function') fetchRepoData();
    if(typeof checkAdminStatus === 'function') checkAdminStatus();
}

window.generateGlobalMagicLink = function() {
    const o = document.getElementById('gsm-owner').value.trim();
    const r = document.getElementById('gsm-repo').value.trim();
    const t = document.getElementById('gsm-token').value.trim();
    if(!t) { alert("请先填写配置"); return; }
    
    const config = { o, r, t };
    const encoded = btoa(JSON.stringify(config));
    // 默认跳回首页登录
    const magicUrl = `${window.location.origin}/index.html?gh_key=${encoded}`;
    
    navigator.clipboard.writeText(magicUrl).then(() => {
        alert("🔗 链接已复制！\n发送到手机点击即可一键登录全站。");
    });
}

function highlightCurrentNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.global-nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (path.includes(href) || (path === '/' && href === 'index.html')) link.classList.add('active');
    });
}