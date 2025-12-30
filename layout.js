// === Kayler 全站核心脚本 v6.0 (最终定稿) ===

document.addEventListener('DOMContentLoaded', () => {
    checkMagicLogin(); // 1. 检查魔法链接
    injectStyles();    // 2. 注入全局样式
    injectHeader();    // 3. 注入导航栏
    injectFooter();    // 4. 注入页脚
    injectAuthModal(); // 5. 注入设置弹窗
    highlightCurrentNav();
    if (window.i18n) {
        window.i18n.init();
        // Sync nav selector
        const navSel = document.getElementById('nav-lang-select');
        if (navSel) navSel.value = window.i18n.currentLang;
    }

    // Listen for external updates
    window.addEventListener('lang-changed', () => {
        if (window.i18n) {
            const navSel = document.getElementById('nav-lang-select');
            if (navSel) navSel.value = window.i18n.currentLang;
        }
    });
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
                // 清理 URL，移除敏感参数
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: newUrl }, '', newUrl);
                // 广播登录成功事件
                window.dispatchEvent(new Event('auth-updated'));
            }
        } catch (e) {
            console.error('Magic link error', e);
        }
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
            position: relative !important; z-index: 10000 !important; /* 提高层级 */
            flex-shrink: 0 !important;
        }
        .global-nav-inner {
            width: 94%; max-width: 1600px; display: flex; justify-content: flex-end; align-items: center; gap: 20px;
        }
        .global-nav-link {
            text-decoration: none !important; color: #666 !important; font-size: 15px !important; font-weight: 600 !important;
            display: flex !important; align-items: center !important; gap: 5px !important; transition: 0.2s !important; font-family: var(--font-stack) !important;
        }
        .global-nav-link:hover, .global-nav-link.active { color: var(--brand-brown) !important; }
        
        .nav-lang-select {
            border: 1px solid #eee; border-radius: 12px; padding: 4px 8px; font-size: 13px; color: #555;
            background: #f9f9f9; cursor: pointer; margin-left: 10px; outline: none; transition: 0.2s;
        }
        .nav-lang-select:hover { background: #fff; border-color: #ccc; }

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
            background: rgba(0,0,0,0.5); z-index: 20000; justify-content: center; align-items: center;
        }
        .gsm-content {
            background: white; padding: 30px; border-radius: 12px; width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2); font-family: var(--font-stack); position: relative;
        }
        .gsm-close { position: absolute; top: 15px; right: 15px; font-size: 24px; cursor: pointer; color: #999; }
        .gsm-close:hover { color: #333; }
        .gsm-field { margin-bottom: 15px; }
        .gsm-label { display: block; font-size: 12px; font-weight: bold; margin-bottom: 5px; color: #555; }
        .gsm-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .gsm-btn { padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: 0.2s; }
        .gsm-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .gsm-btn-primary { background: #8b5e3c; color: white; margin-left: 10px; }
        .gsm-btn-magic { width: 100%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; margin-top: 20px; }
        
        /* 移动端适配 */
        @media (max-width: 768px) {
            .global-nav-inner {
                justify-content: flex-start !important; overflow-x: auto !important; white-space: nowrap !important;
                padding: 0 10px !important; gap: 15px !important; width: 100% !important;
                -webkit-overflow-scrolling: touch;
            }
            .global-nav-inner::-webkit-scrollbar { display: none; }
            .global-nav-link { font-size: 14px !important; flex-shrink: 0 !important; }
        }
    `;
    document.head.appendChild(style);
}

// === 3. 注入导航栏 ===
function injectHeader() {
    const existingNav = document.querySelector('nav.top-nav');

    // 创建新的导航结构
    const navHTML = `
        <div class="global-nav-inner">
            <a href="index.html" class="global-nav-link" data-i18n="nav_home">🏠 卡片生成器</a>
            <a href="editor.html" class="global-nav-link" data-i18n="nav_editor">📝 在线编辑器</a>
            <a href="promptmaster.html" class="global-nav-link" data-i18n="nav_prompt">💡 提示词管理器</a>
            <a href="aiGallery.html" class="global-nav-link" data-i18n="nav_gallery">🖼️ AI 画廊</a>
            <a href="contact.html" class="global-nav-link" data-i18n="nav_contact">📩 联系博主</a>
            <select id="nav-lang-select" class="nav-lang-select" onchange="i18n.setLanguage(this.value)">
                <option value="zh">🇨🇳 中文</option>
                <option value="tw">🇹🇼 繁體中文</option>
                <option value="en">🇺🇸 English</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
            </select>
        </div>
    `;

    if (existingNav) {
        existingNav.innerHTML = navHTML;
        existingNav.classList.add('global-top-nav');
    } else {
        const nav = document.createElement('nav');
        nav.className = 'top-nav global-top-nav';
        nav.innerHTML = navHTML;
        document.body.insertAdjacentElement('afterbegin', nav);
    }
}

// === 4. 注入页脚 (含管理员入口) ===
function injectFooter() {
    const existingFooter = document.querySelector('footer');
    const isEditor = window.location.pathname.includes('editor');
    const footerClass = isEditor ? 'global-footer compact' : 'global-footer';

    // 检查登录状态
    const isLogged = localStorage.getItem('gh_token');
    const adminKey = isLogged ? "footer_admin_login" : "footer_admin_config";

    const footerContent = `
        <p>
            <span data-i18n="footer_copyright">&copy; 2025 Kaylerris 保留所有权利.</span>
            <a onclick="openGlobalSettings()" class="footer-admin-link" id="footerAdminLink" data-i18n="${adminKey}">${adminText}</a>
        </p>
    `;

    if (existingFooter) {
        existingFooter.className = footerClass;
        existingFooter.innerHTML = footerContent;
    } else {
        const footer = document.createElement('footer');
        footer.className = footerClass;
        footer.innerHTML = footerContent;
        document.body.appendChild(footer);
    }
}

// === 5. 注入设置弹窗 (全站通用) ===
function injectAuthModal() {
    if (document.getElementById('global-settings-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'global-settings-modal';
    modal.onclick = (e) => { if (e.target === modal) closeGlobalSettings(); };
    modal.innerHTML = `
        <div class="gsm-content">
            <span class="gsm-close" onclick="closeGlobalSettings()">&times;</span>
            <h3 style="margin-top:0; color:#333;" data-i18n="settings_title">⚙️ 全站配置</h3>
            <p style="font-size:12px; color:#666; margin-bottom:20px;" data-i18n="settings_desc">配置 GitHub Token 以解锁编辑器发布、画廊无限加载等功能。</p>
            
            <div class="gsm-field">
                <label class="gsm-label" data-i18n="settings_label_owner">GitHub 用户名 (Owner)</label>
                <input type="text" id="gsm-owner" class="gsm-input" placeholder="例如: itskys">
            </div>
            <div class="gsm-field">
                <label class="gsm-label" data-i18n="settings_label_repo">仓库名 (Repo)</label>
                <input type="text" id="gsm-repo" class="gsm-input" placeholder="例如: kayler">
            </div>
            <div class="gsm-field">
                <label class="gsm-label" data-i18n="settings_label_token">Token (需 repo 权限)</label>
                <input type="password" id="gsm-token" class="gsm-input" placeholder="******** (留空不修改)">
            </div>
            
            <div class="gsm-field" style="border-top:1px dashed #eee; padding-top:15px;">
                <label class="gsm-label" data-i18n="settings_label_lang">语言 / Language</label>
                <select id="gsm-lang" class="gsm-input" onchange="i18n.setLanguage(this.value)">
                    <option value="zh">🇨🇳 中文 (简体)</option>
                    <option value="tw">🇹🇼 繁體中文</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="ja">🇯🇵 日本語</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                </select>
            </div>

            <div style="text-align:right; border-bottom:1px solid #eee; padding-bottom:20px;">
                <button onclick="closeGlobalSettings()" class="gsm-btn" style="background:#f5f5f5; color:#666;" data-i18n="settings_btn_cancel">取消</button>
                <button onclick="saveGlobalSettings()" class="gsm-btn gsm-btn-primary" data-i18n="settings_btn_save">保存配置</button>
            </div>

            <div style="margin-top:15px;">
                <button class="gsm-btn gsm-btn-magic" onclick="generateGlobalMagicLink()" data-i18n="settings_btn_magic">⚡ 生成跨设备登录链接</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// === 公共 API 供页面调用 ===
window.openGlobalSettings = function () {
    document.getElementById('gsm-owner').value = localStorage.getItem('gh_owner') || 'itskys';
    document.getElementById('gsm-repo').value = localStorage.getItem('gh_repo') || 'kayler';
    const token = localStorage.getItem('gh_token');
    const tokenInput = document.getElementById('gsm-token');
    if (token) { tokenInput.placeholder = "******** (已配置)"; tokenInput.value = ""; }
    else { tokenInput.placeholder = "github_pat_..."; tokenInput.value = ""; }

    // 设置当前语言选中状态
    if (window.i18n) {
        document.getElementById('gsm-lang').value = window.i18n.currentLang;
    }

    document.getElementById('global-settings-modal').style.display = 'flex';
}

window.closeGlobalSettings = function () {
    document.getElementById('global-settings-modal').style.display = 'none';
}

window.saveGlobalSettings = function () {
    const owner = document.getElementById('gsm-owner').value.trim();
    const repo = document.getElementById('gsm-repo').value.trim();
    const token = document.getElementById('gsm-token').value.trim();

    if (owner) localStorage.setItem('gh_owner', owner);
    if (repo) localStorage.setItem('gh_repo', repo);
    // 仅当输入新Token时才保存
    if (token) localStorage.setItem('gh_token', token);

    const alertMsg = (window.i18n && window.i18n.t) ? window.i18n.t('settings_alert_saved') : '✅ 配置已保存！全站生效。';
    alert(alertMsg);
    closeGlobalSettings();

    // 更新页脚状态
    const link = document.getElementById('footerAdminLink');
    if (link) {
        const key = localStorage.getItem('gh_token') ? "footer_admin_login" : "footer_admin_config";
        link.setAttribute('data-i18n', key);
        if (window.i18n) link.innerHTML = window.i18n.t(key);
    }

    // 触发自定义事件，通知页面刷新状态
    window.dispatchEvent(new Event('auth-updated'));

    // 如果是画廊或提示词页，刷新数据
    if (typeof fetchRepoData === 'function') fetchRepoData();
    if (typeof checkAdminStatus === 'function') checkAdminStatus();

    // 刷新页面以确保所有状态同步
    window.location.reload();
}

window.generateGlobalMagicLink = function () {
    const o = document.getElementById('gsm-owner').value.trim() || localStorage.getItem('gh_owner');
    const r = document.getElementById('gsm-repo').value.trim() || localStorage.getItem('gh_repo');
    const t = document.getElementById('gsm-token').value.trim() || localStorage.getItem('gh_token');

    if (!t) { alert("请先保存 Token！"); return; }

    const config = { o, r, t };
    const encoded = encodeURIComponent(btoa(JSON.stringify(config)));
    const magicUrl = `${window.location.origin}/index.html?gh_key=${encoded}`;

    navigator.clipboard.writeText(magicUrl).then(() => {
        alert("🔗 链接已复制！\n发送到任意设备打开即可一键登录全站。");
    });
}

function highlightCurrentNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.global-nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (path.includes(href) || (path === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}