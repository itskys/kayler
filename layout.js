// === 公共布局脚本 v3.0 (支持魔法链接登录) ===

document.addEventListener('DOMContentLoaded', () => {
    checkMagicLogin(); // 1. 先检查是否是魔法链接登录
    injectStyles();
    injectHeader();
    injectFooter();
    highlightCurrentNav();
});

// === 核心功能：检查并处理魔法链接 ===
function checkMagicLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 如果 URL 里包含 gh_key 参数
    if (urlParams.has('gh_key')) {
        try {
            // 解码 (Base64 -> JSON)
            const rawData = atob(urlParams.get('gh_key'));
            const config = JSON.parse(rawData);

            if (config.t && config.o && config.r) {
                // 写入本地存储
                localStorage.setItem('gh_token', config.t);
                localStorage.setItem('gh_owner', config.o);
                localStorage.setItem('gh_repo', config.r);
                
                alert(`🎉 身份验证成功！\n\n欢迎回来，管理员 ${config.o}。\n您现在可以在此设备上发布内容了。`);
                
                // 清理 URL (移除敏感参数，防止被别人看到)
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({path:newUrl}, '', newUrl);
                
                // 刷新页面以应用状态
                window.location.reload();
            }
        } catch (e) {
            console.error('Magic link invalid', e);
            alert('❌ 魔法链接无效或已损坏');
        }
    }
}

// 1. 注入全局样式
function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            --font-stack: "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
            --brand-brown: #8b5e3c;
        }
        
        /* 导航栏样式 */
        .global-top-nav {
            background: white !important;
            border-bottom: 1px solid #eee !important;
            height: 50px !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            flex-shrink: 0 !important;
            position: relative !important;
            z-index: 1000 !important;
            box-sizing: border-box !important;
        }
        
        .global-nav-inner {
            width: 94%;
            max-width: 1600px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
        }

        .global-nav-link {
            text-decoration: none !important;
            color: #666 !important;
            font-family: var(--font-stack) !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
            transition: color 0.2s !important;
        }

        .global-nav-link:hover, .global-nav-link.active {
            color: var(--brand-brown) !important;
        }

        /* 页脚样式 */
        .global-footer {
            margin-top: auto !important;
            padding: 30px 0 !important;
            border-top: 1px solid #eee !important;
            width: 100% !important;
            text-align: center !important;
            color: #999 !important;
            font-size: 13px !important;
            font-family: var(--font-stack) !important;
            background: white !important;
            flex-shrink: 0 !important;
            padding-bottom: 40px !important;
        }
    `;
    document.head.appendChild(style);
}

// 2. 注入导航栏
function injectHeader() {
    const oldNav = document.querySelector('nav.top-nav');
    if (oldNav) oldNav.remove();

    const header = document.createElement('nav');
    header.className = 'global-top-nav';
    header.innerHTML = `
        <div class="global-nav-inner">
            <a href="index.html" class="global-nav-link">🏠 卡片生成器</a>
            <a href="editor.html" class="global-nav-link">📝 在线编辑器</a>
            <a href="promptmaster.html" class="global-nav-link">💡 提示词管理器</a>
            <a href="aiGallery.html" class="global-nav-link">🖼️ AI图片展</a>
            <a href="contact.html" class="global-nav-link">📩 联系博主</a>
        </div>
    `;
    document.body.insertAdjacentElement('afterbegin', header);
}

// 3. 注入页脚
function injectFooter() {
    const oldFooter = document.querySelector('footer');
    if (oldFooter) oldFooter.remove();

    const footer = document.createElement('footer');
    footer.className = 'global-footer';
    footer.innerHTML = `<p>&copy; 2025 Kaylerris 保留所有权利.</p>`;
    document.body.appendChild(footer);
}

// 4. 高亮当前
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