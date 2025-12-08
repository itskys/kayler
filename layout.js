// === 公共布局脚本 v2.0 ===

document.addEventListener('DOMContentLoaded', () => {
    injectStyles(); // 先注入样式
    injectHeader();
    injectFooter();
    highlightCurrentNav();
});

// 1. 注入全局样式 (解决字体不一致)
function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* 全局字体变量 */
        :root {
            --font-stack: "PingFang SC", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
            --brand-brown: #8b5e3c;
        }
        
        /* 导航栏样式 (高权重) */
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
        }
    `;
    document.head.appendChild(style);
}

// 2. 注入导航栏
function injectHeader() {
    // 移除旧导航 (如果有)
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
    // 插入到 body 最前面
    document.body.insertAdjacentElement('afterbegin', header);
}

// 3. 注入页脚
function injectFooter() {
    const oldFooter = document.querySelector('footer');
    if (oldFooter) oldFooter.remove();

    const footer = document.createElement('footer');
    footer.className = 'global-footer';
    footer.innerHTML = `<p>&copy; 2025 Kaylerris 保留所有权利.</p>`;
    
    // 插入到 body 最后面
    document.body.appendChild(footer);
}

// 4. 高亮
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