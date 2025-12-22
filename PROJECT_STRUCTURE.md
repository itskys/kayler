# 📁 Project Structure

This document outlines the file structure and purpose of each component in the Kayler codebase.

## 核心页面 (Core Pages)

| File | Purpose | Version |
| :--- | :--- | :--- |
| **[index.html](index.html)** | **Card Generator** - The main application for creating social media text cards. | v3.5 |
| **[editor.html](editor.html)** | **Markdown Editor** - Online Markdown editor with live preview and GitHub publishing. | v6.2 |
| **[promptmaster.html](promptmaster.html)** | **Prompt Manager** - Tool for managing and editing AI prompts with Monaco Editor. | - |
| **[aiGallery.html](aiGallery.html)** | **AI Gallery** - A gallery view for displaying published workflows or images. | - |
| **[contact.html](contact.html)** | **Contact Page** - User contact information. | - |
| **[404.html](404.html)** | **404 Page** - Custom error page. | - |

## 核心脚本 (Core Scripts)

| File | Purpose | Version |
| :--- | :--- | :--- |
| **[layout.js](layout.js)** | **Global Layout & Auth** - Handles the global navigation, footer, and GitHub Token authentication logic. | v6.0 |
| **[editor.js](editor.js)** | **Editor Logic** - Contains the core logic for the Markdown editor, PDF export, and GitHub API interactions. | v6.2 |
| **[markdown-data.js](markdown-data.js)** | **Sample Data** - Provides initial or sample Markdown data for the editor. | - |

## 样式与资源 (Styles & Assets)

| File | Purpose |
| :--- | :--- |
| **[editor.css](editor.css)** | **Editor Styles** - Specific styles for the editor interface. |
| **[logo.png](logo.png)** | **Logo** - Project logo asset. |
| **[favicon.png](favicon.png)** | **Favicon** - Browser tab icon. |
| **[social-cover.png](social-cover.png)** | **Social Cover** - Open Graph image for social sharing. |

## 配置文件 (Configuration)

| File | Purpose |
| :--- | :--- |
| **[manifest.json](manifest.json)** | **PWA Manifest** - Configuration for Progressive Web App support. |
| **[robots.txt](robots.txt)** | **Robots.txt** - SEO crawler directives. |
| **[sitemap.xml](sitemap.xml)** | **Sitemap** - Website sitemap for search engines. |

## 目录 (Directories)

| Directory | Purpose |
| :--- | :--- |
| **[gallery/](gallery/)** | **Gallery Data** - Stores generated images or gallery data. |
| **[prompt/](prompt/)** | **Prompt Storage** - Default directory for saving prompts. |
