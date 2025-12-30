/**
 * Kayler i18n Module v1.0
 * Supports: zh, tw, en, ja, es, fr
 */

const i18n = {
    currentLang: 'zh',
    translations: {
        tw: {
            // == Navigation & Layout ==
            nav_home: "🏠 卡片產生器",
            nav_editor: "📝 線上編輯器",
            nav_prompt: "💡 提示詞管理器",
            nav_gallery: "🖼️ AI 畫廊",
            nav_contact: "📩 聯絡博主",
            footer_copyright: "© 2025 Kaylerris 保留所有權利.",
            footer_admin_login: "✅ 管理員已登入",
            footer_admin_config: "⚙️ 管理員配置",

            // == Settings Modal ==
            settings_title: "⚙️ 全站配置",
            settings_desc: "配置 GitHub Token 以解鎖編輯器發布、畫廊無限載入等功能。",
            settings_label_owner: "GitHub 使用者名稱 (Owner)",
            settings_label_repo: "倉庫名 (Repo)",
            settings_label_token: "Token (需 repo 權限)",
            settings_label_lang: "語言 / Language",
            settings_btn_cancel: "取消",
            settings_btn_save: "儲存配置",
            settings_btn_magic: "⚡ 產生跨裝置登入連結",
            settings_alert_saved: "✅ 配置已儲存！全站生效。",

            // == Index Page ==
            app_title: "Kayler文字卡片產生器",
            app_counter: "✨ 已累計協助產生 <span id='totalCount'>...</span> 張精緻卡片",

            tool_theme: "🎨 主題:",
            tool_bg: "🖼️ 背景圖",
            tool_opacity: "透明度:",
            tool_font: "🅰️ 字體:",
            tool_size: "📏 字號:",
            tool_sign: "✍️ 簽名:",
            tool_xhs: "📕 小紅書風",
            tool_split: "📄 分頁:",

            opt_split_count: "等分 X 張",
            opt_split_single: "單張長圖",
            opt_split_length: "1k字/張",

            placeholder_input: "在此貼上文章...\n\n自動儲存功能已啟用，不用擔心內容遺失。\n可以在上方工具列修改 @署名。",
            hint_right_area: "提示：右側每張卡片下方均可單獨複製或儲存",

            btn_batch_download: "💾 批次下載",
            btn_copy_first: "📋 複製第一張",
            btn_publish_gallery: "☁️ 發布到畫廊",

            card_page_prefix: "第",
            card_page_suffix: "頁",
            card_continued: "（續",
            card_continued_suffix: "）",

            toast_publishing: "☁️ 正在發布到畫廊...",
            alert_publish_success: "✅ 發布成功！\n圖片已上傳至畫廊，稍後即可在 AI 圖片展中看到。",
            confirm_publish: "確定要將第一張卡片發布到「AI 圖片展」嗎？",

            // == Themes ==
            theme_default: "經典羊皮",
            theme_white: "極簡純白",
            theme_pink: "櫻花粉",
            theme_green: "護眼綠",
            theme_mint: "薄荷綠",
            theme_blue: "靜謐藍",
            theme_grey: "極簡灰",
            theme_kraft: "復古牛皮",
            theme_deepblue: "深海藍",
            theme_dark: "暗夜極客",

            // == Fonts ==
            font_heiti: "現代黑體",
            font_songti: "文藝宋體",
            font_noto: "思源宋體",
            font_kaiti: "楷體",
            font_xiaowei: "文藝體",
            font_handwriting: "優雅手寫",

            // === Editor Page ===
            editor_title: "線上 Markdown 編輯器",
            editor_input_name: "檔名 (例如: doc.md)",
            btn_editor_publish: "發布",
            btn_editor_pdf: "PDF",
            btn_editor_md: ".md",
            btn_editor_long: "轉長圖",
            editor_source_title: "Markdown 原始碼",
            btn_clear: "清空",
            btn_copy_source: "複製原始碼",
            editor_preview_title: "即時預覽",
            btn_copy_text: "複製文字",
            alert_clear_confirm: "⚠️ 確定要清空編輯器中的所有內容嗎？此操作無法復原。",
            editor_placeholder: "# 開始寫作...\n\n支援 Markdown 語法，即時預覽。",

            // === Prompt Master Page ===
            prompt_title: "提示詞管理器",
            tab_basic: "📝 基礎",
            tab_style: "🎨 風格",
            tab_params: "🎛️ 參數",
            lbl_quick_tags: "⚡ 快速標籤 (預設 + 自定義)",
            btn_add_tag: "+ 新增我的標籤",
            lbl_popular_style: "流行風格",
            lbl_model_ver: "模型版本 (Model)",
            lbl_aspect_ratio: "畫幅比例 (--ar)",
            btn_preview: "👁️ 預覽",
            btn_copy_onekey: "📋 一鍵複製",
            header_library: "📚 提示詞庫",
            btn_cache: "⚡ 快取",
            search_prompt_placeholder: "搜尋名稱、描述或分類...",
            col_name: "名稱",
            col_ver: "版本",
            col_cat: "分類",
            col_desc: "功能描述",
            col_example: "範例 (自動)",
            col_author: "作者",
            modal_file_preview: "檔案預覽",
            btn_delete_file: "🗑️ 刪除檔案",
            btn_download_md: "📥 下載 .md",
            btn_import_editor: "✏️ 匯入編輯器",
            btn_copy: "📋 複製",
            alert_copy_success: "✅ 已複製到剪貼簿",

            // === AI Gallery Page ===
            gallery_title: "AI 畫廊",
            search_gallery_placeholder: "搜尋圖片...",
            btn_refresh: "🔄 重新整理",
            btn_upload: "☁️ 上傳",
            btn_settings: "⚙️ 設定",
            tag_all: "全部",
            modal_delete_img: "🗑️ 刪除此圖",
            modal_upload_title: "📤 上傳圖片",
            lbl_file_count: "個檔案",
            lbl_selected: "已選",
            lbl_is_example: "🔗 設為提示詞範例",
            lbl_core_name: "核心名稱",
            lbl_ver_name: "版本號 (可選)",
            btn_start_upload: "開始上傳",
            alert_upload_done: "上傳完成",

            // === Contact Page ===
            contact_title: "聯絡博主",
            contact_subtitle: "Contact Me",
            contact_twitter: "X (Twitter)",
            contact_email: "Email",
            contact_email_desc: "點擊傳送電子郵件",
            contact_note: "👋 感謝關注。<br>若有業務合作、推廣等事宜，歡迎隨時聯繫。",

            // Missing JS Alerts
            prompt_new_tag: "輸入新標籤內容:",
            confirm_clear: "清空內容？",
            alert_empty: "內容為空",
            alert_enter_core_name: "請輸入核心名稱",
            confirm_delete: "確定永久刪除？",
            alert_delete_success: "刪除成功",
            alert_delete_fail: "刪除失敗: ",
            alert_filename_copied: "檔名已複製"
        },
        zh: {
            // == Navigation & Layout ==
            nav_home: "🏠 卡片生成器",
            nav_editor: "📝 在线编辑器",
            nav_prompt: "💡 提示词管理器",
            nav_gallery: "🖼️ AI 画廊",
            nav_contact: "📩 联系博主",
            footer_copyright: "© 2025 Kaylerris 保留所有权利.",
            footer_admin_login: "✅ 管理员已登录",
            footer_admin_config: "⚙️ 管理员配置",

            // == Settings Modal ==
            settings_title: "⚙️ 全站配置",
            settings_desc: "配置 GitHub Token 以解锁编辑器发布、画廊无限加载等功能。",
            settings_label_owner: "GitHub 用户名 (Owner)",
            settings_label_repo: "仓库名 (Repo)",
            settings_label_token: "Token (需 repo 权限)",
            settings_label_lang: "语言 / Language",
            settings_btn_cancel: "取消",
            settings_btn_save: "保存配置",
            settings_btn_magic: "⚡ 生成跨设备登录链接",
            settings_alert_saved: "✅ 配置已保存！全站生效。",

            // == Index Page ==
            app_title: "Kayler文字卡片生成器",
            app_counter: "✨ 已累计协助生成 <span id='totalCount'>...</span> 张精致卡片",

            tool_theme: "🎨 主题:",
            tool_bg: "🖼️ 背景图",
            tool_opacity: "透明度:",
            tool_font: "🅰️ 字体:",
            tool_size: "📏 字号:",
            tool_sign: "✍️ 签名:",
            tool_xhs: "📕 小红书风",
            tool_split: "📄 分页:",

            opt_split_count: "等分 X 张",
            opt_split_single: "单张长图",
            opt_split_length: "1k字/张",

            placeholder_input: "在此粘贴文章...\n\n自动保存功能已启用，不用担心内容丢失。\n可以在上方工具栏修改 @署名。",
            hint_right_area: "提示：右侧每张卡片下方均可单独复制或保存",

            btn_batch_download: "💾 批量下载",
            btn_copy_first: "📋 复制第一张",
            btn_publish_gallery: "☁️ 发布到画廊",

            card_page_prefix: "第",
            card_page_suffix: "页",
            card_continued: "（续",
            card_continued_suffix: "）",

            toast_publishing: "☁️ 正在发布到画廊...",
            alert_publish_success: "✅ 发布成功！\n图片已上传至画廊，稍后即可在 AI 图片展中看到。",
            confirm_publish: "确定要将第一张卡片发布到「AI 图片展」吗？",

            // == Themes ==
            theme_default: "经典羊皮",
            theme_white: "极简纯白",
            theme_pink: "樱花粉",
            theme_green: "护眼绿",
            theme_mint: "薄荷绿",
            theme_blue: "静谧蓝",
            theme_grey: "极简灰",
            theme_kraft: "复古牛皮",
            theme_deepblue: "深海蓝",
            theme_dark: "暗夜极客",

            // == Fonts ==
            font_heiti: "现代黑体",
            font_songti: "文艺宋体",
            font_noto: "思源宋体",
            font_kaiti: "楷体",
            font_xiaowei: "文艺体",
            font_handwriting: "优雅手写"
        },
        en: {
            nav_home: "🏠 Card Generator",
            nav_editor: "📝 Markdown Editor",
            nav_prompt: "💡 Prompt Manager",
            nav_gallery: "🖼️ AI Gallery",
            nav_contact: "📩 Contact",
            footer_copyright: "© 2025 Kaylerris. All rights reserved.",
            footer_admin_login: "✅ Admin Logged In",
            footer_admin_config: "⚙️ Admin Config",

            settings_title: "⚙️ Settings",
            settings_desc: "Configure GitHub Token for publishing and gallery features.",
            settings_label_owner: "GitHub Username",
            settings_label_repo: "Repository Name",
            settings_label_token: "Access Token",
            settings_label_lang: "Language",
            settings_btn_cancel: "Cancel",
            settings_btn_save: "Save Config",
            settings_btn_magic: "⚡ Generate Magic Link",
            settings_alert_saved: "✅ Configuration saved!",

            app_title: "Kayler Card Generator",
            app_counter: "✨ Assisted in creating <span id='totalCount'>...</span> cards",

            tool_theme: "🎨 Theme:",
            tool_bg: "🖼️ Background",
            tool_opacity: "Opacity:",
            tool_font: "🅰️ Font:",
            tool_size: "📏 Size:",
            tool_sign: "✍️ Sign:",
            tool_xhs: "📕 XHS Style",
            tool_split: "📄 Split:",

            opt_split_count: "Split by Count",
            opt_split_single: "Single Long Image",
            opt_split_length: "1k chars/page",

            placeholder_input: "Paste your text here...\n\nAuto-save is enabled.\nYou can change the @signature in the toolbar.",
            hint_right_area: "Tip: You can save or copy each card individually below.",

            btn_batch_download: "💾 Download All",
            btn_copy_first: "📋 Copy First",
            btn_publish_gallery: "☁️ Publish to Gallery",

            card_page_prefix: "Page",
            card_page_suffix: "",
            card_continued: "(Cont.",
            card_continued_suffix: ")",

            toast_publishing: "☁️ Publishing...",
            alert_publish_success: "✅ Published successfully!",
            confirm_publish: "Publish the first card to the AI Gallery?",

            theme_default: "Classic",
            theme_white: "White",
            theme_pink: "Pink",
            theme_green: "Green",
            theme_mint: "Mint",
            theme_blue: "Blue",
            theme_grey: "Grey",
            theme_kraft: "Kraft",
            theme_deepblue: "Deep Blue",
            theme_dark: "Dark Mode",

            font_heiti: "Sans Serif",
            font_songti: "Serif",
            font_noto: "Noto Serif",
            font_kaiti: "KaiTi",
            font_xiaowei: "Artistic",
            font_handwriting: "Handwriting"
        },
        ja: {
            nav_home: "🏠 カード作成",
            nav_editor: "📝 エディター",
            nav_prompt: "💡 プロンプト",
            nav_gallery: "🖼️ ギャラリー",
            nav_contact: "📩 お問い合わせ",
            footer_copyright: "© 2025 Kaylerris. All rights reserved.",
            footer_admin_login: "✅ 管理者ログイン中",
            footer_admin_config: "⚙️ 設定",

            settings_title: "⚙️ 設定",
            settings_desc: "GitHubトークンを設定して機能制限を解除します。",
            settings_label_owner: "ユーザー名 (Owner)",
            settings_label_repo: "リポジトリ名 (Repo)",
            settings_label_token: "トークン (Token)",
            settings_label_lang: "言語 / Language",
            settings_btn_cancel: "キャンセル",
            settings_btn_save: "保存",
            settings_btn_magic: "⚡ マジックリンク生成",
            settings_alert_saved: "✅ 設定を保存しました。",

            app_title: "Kayler カードジェネレーター",
            app_counter: "✨ 作成されたカード総数: <span id='totalCount'>...</span>",

            tool_theme: "🎨 テーマ:",
            tool_bg: "🖼️ 背景",
            tool_opacity: "透明度:",
            tool_font: "🅰️ フォント:",
            tool_size: "📏 サイズ:",
            tool_sign: "✍️ 署名:",
            tool_xhs: "📕 XHS風",
            tool_split: "📄 分割:",

            opt_split_count: "枚数指定",
            opt_split_single: "一枚の長画像",
            opt_split_length: "1k文字/枚",

            placeholder_input: "ここにテキストを貼り付けてください...\n\n自動保存が有効です。\n上のツールバーで署名を変更できます。",
            hint_right_area: "ヒント：右側の各カードの下にあるボタンで保存・コピーが可能です。",

            btn_batch_download: "💾 一括ダウンロード",
            btn_copy_first: "📋 最初の枚をコピー",
            btn_publish_gallery: "☁️ ギャラリーに公開",

            card_page_prefix: "",
            card_page_suffix: " / ",
            card_continued: "(続く",
            card_continued_suffix: ")",

            toast_publishing: "☁️ 公開中...",
            alert_publish_success: "✅ 公開しました！",
            confirm_publish: "最初のカードをギャラリーに公開しますか？",

            theme_default: "クラシック",
            theme_white: "ホワイト",
            theme_pink: "ピンク",
            theme_green: "グリーン",
            theme_mint: "ミント",
            theme_blue: "ブルー",
            theme_grey: "グレー",
            theme_kraft: "クラフト",
            theme_deepblue: "ディープブルー",
            theme_dark: "ダークモード",

            font_heiti: "ゴシック体",
            font_songti: "明朝体",
            font_noto: "Noto明朝",
            font_kaiti: "楷書体",
            font_xiaowei: "デザイン体",
            font_handwriting: "手書き風"
        },
        es: {
            nav_home: "🏠 Generador",
            nav_editor: "📝 Editor",
            nav_prompt: "💡 Prompts",
            nav_gallery: "🖼️ Galería",
            nav_contact: "📩 Contacto",
            footer_copyright: "© 2025 Kaylerris. Todos los derechos reservados.",
            footer_admin_login: "✅ Admin Conectado",
            footer_admin_config: "⚙️ Config Admin",

            settings_title: "⚙️ Configuración Global",
            settings_desc: "Configure GitHub Token para funciones avanzadas.",
            settings_label_owner: "Usuario GitHub",
            settings_label_repo: "Nombre del Repo",
            settings_label_token: "Token de Acceso",
            settings_label_lang: "Idioma / Language",
            settings_btn_cancel: "Cancelar",
            settings_btn_save: "Guardar",
            settings_btn_magic: "⚡ Enlace Mágico",
            settings_alert_saved: "✅ Configuración guardada.",

            app_title: "Generador de Tarjetas Kayler",
            app_counter: "✨ Tarjetas generadas: <span id='totalCount'>...</span>",

            tool_theme: "🎨 Tema:",
            tool_bg: "🖼️ Fondo",
            tool_opacity: "Opacidad:",
            tool_font: "🅰️ Fuente:",
            tool_size: "📏 Tam:",
            tool_sign: "✍️ Firma:",
            tool_xhs: "📕 Estilo XHS",
            tool_split: "📄 Pág:",

            opt_split_count: "Dividir en X",
            opt_split_single: "Imagen Larga",
            opt_split_length: "1k caracteres",

            placeholder_input: "Pegue su texto aquí...\n\nEl guardado automático está activado.\nPuede cambiar la firma en la barra de herramientas.",
            hint_right_area: "Consejo: Puede guardar o copiar cada tarjeta individualmente.",

            btn_batch_download: "💾 Descargar Todo",
            btn_copy_first: "📋 Copiar 1ª",
            btn_publish_gallery: "☁️ Publicar",

            card_page_prefix: "Pág",
            card_page_suffix: "",
            card_continued: "(Cont.",
            card_continued_suffix: ")",

            toast_publishing: "☁️ Publicando...",
            alert_publish_success: "✅ ¡Publicado con éxito!",
            confirm_publish: "¿Publicar la primera tarjeta en la Galería?",

            theme_default: "Clásico",
            theme_white: "Blanco",
            theme_pink: "Rosa",
            theme_green: "Verde",
            theme_mint: "Menta",
            theme_blue: "Azul",
            theme_grey: "Gris",
            theme_kraft: "Papel Kraft",
            theme_deepblue: "Azul Profundo",
            theme_dark: "Modo Oscuro",

            font_heiti: "Sans Serif",
            font_songti: "Serif",
            font_noto: "Noto Serif",
            font_kaiti: "KaiTi",
            font_xiaowei: "Artístico",
            font_handwriting: "Manuscrito"
        },
        fr: {
            nav_home: "🏠 Générateur",
            nav_editor: "📝 Éditeur",
            nav_prompt: "💡 Prompts",
            nav_gallery: "🖼️ Galerie",
            nav_contact: "📩 Contact",
            footer_copyright: "© 2025 Kaylerris. Tous droits réservés.",
            footer_admin_login: "✅ Admin Connecté",
            footer_admin_config: "⚙️ Config Admin",

            settings_title: "⚙️ Paramètres",
            settings_desc: "Configurez le Token GitHub pour plus de fonctionnalités.",
            settings_label_owner: "Utilisateur GitHub",
            settings_label_repo: "Nom du Repo",
            settings_label_token: "Token d'accès",
            settings_label_lang: "Langue / Language",
            settings_btn_cancel: "Annuler",
            settings_btn_save: "Enregistrer",
            settings_btn_magic: "⚡ Lien Magique",
            settings_alert_saved: "✅ Configuration enregistrée.",

            app_title: "Générateur de Cartes Kayler",
            app_counter: "✨ Cartes générées : <span id='totalCount'>...</span>",

            tool_theme: "🎨 Thème:",
            tool_bg: "🖼️ Fond",
            tool_opacity: "Opacité:",
            tool_font: "🅰️ Police:",
            tool_size: "📏 Taille:",
            tool_sign: "✍️ Signe:",
            tool_xhs: "📕 Style XHS",
            tool_split: "📄 Page:",

            opt_split_count: "Diviser en X",
            opt_split_single: "Image Longue",
            opt_split_length: "1k car./page",

            placeholder_input: "Collez votre texte ici...\n\nSauvegarde automatique activée.\nVous pouvez modifier la signature dans la barre d'outils.",
            hint_right_area: "Astuce : Vous pouvez enregistrer ou copier chaque carte individuellement.",

            btn_batch_download: "💾 Tout Télécharger",
            btn_copy_first: "📋 Copier la 1ère",
            btn_publish_gallery: "☁️ Publier",

            card_page_prefix: "Page",
            card_page_suffix: "",
            card_continued: "(Suite",
            card_continued_suffix: ")",

            toast_publishing: "☁️ Publication...",
            alert_publish_success: "✅ Publié avec succès !",
            confirm_publish: "Publier la première carte dans la Galerie ?",

            theme_default: "Classique",
            theme_white: "Blanc",
            theme_pink: "Rose",
            theme_green: "Vert",
            theme_mint: "Menthe",
            theme_blue: "Bleu",
            theme_grey: "Gris",
            theme_kraft: "Kraft",
            theme_deepblue: "Bleu Profond",
            theme_dark: "Mode Sombre",

            font_heiti: "Sans Serif",
            font_songti: "Serif",
            font_noto: "Noto Serif",
            font_kaiti: "KaiTi",
            font_xiaowei: "Artistique",
            font_handwriting: "Manuscrit"
        }
    },

    init: function () {
        const saved = localStorage.getItem('kayler_lang');
        if (saved) {
            this.currentLang = saved;
        } else {
            const browser = navigator.language.toLowerCase();
            if (['zh-tw', 'zh-hk'].includes(browser)) {
                this.currentLang = 'tw';
            } else if (['en', 'ja', 'es', 'fr'].includes(browser.slice(0, 2))) {
                this.currentLang = browser.slice(0, 2);
            } else {
                this.currentLang = 'zh';
            }
        }
        this.apply();
        console.log("🌍 i18n Initialized. Current:", this.currentLang);
    },

    setLanguage: function (lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('kayler_lang', lang);
        this.apply();

        // 触发自定义事件，通知页面重新渲染（如卡片预览）
        window.dispatchEvent(new Event('lang-changed'));
    },

    t: function (key) {
        if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
            return this.translations[this.currentLang][key];
        }
        if (this.translations['en'] && this.translations['en'][key]) {
            return this.translations['en'][key];
        }
        return key;
    },

    apply: function () {
        // 1. 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = this.t(key);

            // 优先检查是否有显式指定的目标属性
            const targetAttr = el.getAttribute('data-i18n-attr');
            if (targetAttr) {
                el.setAttribute(targetAttr, val);
                return;
            }

            // 智能判断默认行为
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = val;
                } else if (el.type === 'button' || el.type === 'submit') {
                    el.value = val;
                }
            } else if (el.tagName === 'OPTION') {
                el.innerText = val;
            } else {
                // 如果包含 HTML (如 totalCount)，需要特殊处理
                el.innerHTML = val;
            }
        });

        // 2. 更新文档标题
        document.title = this.t('app_title') + " - Kayler";
    }
};

// 暴露全局
window.i18n = i18n;
