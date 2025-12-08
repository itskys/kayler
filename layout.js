// === 公共布局脚本：自动注入导航栏和页脚 ===

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    highlightCurrentNav();
});

// 1. 注入顶部导航
function injectHeader() {
    // 如果页面已经手动写了导航，先移除
    const existingNav = document.querySelector('nav.top-nav');
    if (existingNav) existingNav.remove();

    const headerHTML = `
    <nav class="top-nav">
        <div class="top-nav-inner" style="width: 94%; max-width: 1600px; display: flex; justify-content: flex-end; align-items: center; gap: 20px;">
            <a href="index.html" class="nav-link">🏠 卡片生成器</a>
            <a href="editor.html" class="nav-link">📝 在线编辑器</a>
            <a href="promptmaster.html" class="nav-link">💡 提示词管理器</a>
            <a href="aiGallery.html" class="nav-link">🖼️ AI图片展</a>
            <a href="contact.html" class="nav-link">📩 联系博主</a>
        </div>
    </nav>
    <style>
        /* 注入的导航样式 */
        .top-nav {
            background: white; border-bottom: 1px solid #eee; 
            height: 50px; flex-shrink: 0; width: 100%;
            display: flex; justify-content: center; position: relative; z-index: 100;
        }
        .nav-link {
            text-decoration: none; color: #666; font-size: 15px; font-weight: 600;
            display: flex; align-items: center; gap: 5px; transition: 0.2s; font-family: "PingFang SC", sans-serif;
        }
        .nav-link:hover, .nav-link.active { color: #8b5e3c; }
    </style>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// 2. 注入统一页脚
function injectFooter() {
    const existingFooter = document.querySelector('footer');
    if (existingFooter) existingFooter.remove();

    const footerHTML = `
    <footer style="margin-top: auto; padding: 30px 0; border-top: 1px solid #eee; width: 100%; text-align: center; color: #999; font-size: 13px; font-family: sans-serif; background:white;">
        <p>&copy; 2025 Kaylerris 保留所有权利.</p>
    </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// 3. 高亮当前页面导航
function highlightCurrentNav() {
    const path = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        // 简单匹配：如果当前路径包含 href (比如 /editor.html)，或者首页匹配 index.html
        if (path.includes(href) || (path === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}