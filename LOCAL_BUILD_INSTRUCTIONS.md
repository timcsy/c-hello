# 本地編譯並上傳部署指南

## 流程概述

GitHub Actions 現已修改為：
- ✅ 優先檢查 `test/dist/` 是否存在
- ✅ 如果存在預編譯的 dist，**直接跳過 Node.js 設置** 並部署
- ✅ 如果不存在，才會在 GitHub 上編譯（備用方案）

## 📝 本地編譯步驟

### 1. 在本地編譯生成 dist/

```bash
cd test
npm install
npm run build
```

編譯完成後，會生成 `test/dist/` 目錄，內含：
- `index.html`
- `assets/index-*.js`
- `assets/index-*.css`

### 2. 驗證編譯結果

```bash
npm run preview
```

訪問 http://localhost:4173 測試網站功能

### 3. 提交代碼到 Git（但不推送）

```bash
# 確保 dist/ 已添加到 Git
git add test/dist/
git add -A

# 提交
git commit -m "feat: build dist for deployment"
```

### 4. 手動推送到 GitHub

**方式一：直接推送**
```bash
git push origin main
```

**方式二：推送到自定義分支再合併**
```bash
git push origin local-branch-name
# 然後在 GitHub 上創建 PR 合併到 main
```

---

## ⚡ 快速命令組合

```bash
# 一次性完成編譯、提交、推送
cd test && npm install && npm run build && cd .. && \
git add . && \
git commit -m "build: compile dist for deployment" && \
git push origin main
```

---

## 🔍 部署流程驗證

1. **推送後**，訪問 GitHub Actions：
   ```
   https://github.com/timcsy/c-hello/actions
   ```

2. **應該看到**：
   - ✅ "Check for pre-built artifacts" → 輸出 `dist_exists=true`
   - ⏭️ "Setup Node.js" 步驟被 **跳過**
   - ✅ 直接進入 "Upload artifact" 和 "Deploy to GitHub Pages"

3. **部署完成後**，訪問：
   ```
   https://timcsy.github.io/c-hello/
   ```

---

## 💡 常見場景

### 場景 1：編譯成功，推送部署
```bash
cd test && npm install && npm run build && cd ..
git add test/dist && git commit -m "build: dist" && git push origin main
```
✅ GitHub Actions 快速跳過 Node.js 設置，直接部署

### 場景 2：編譯完成，但想測試部署前的功能
```bash
npm run preview    # 本地預覽測試
# 驗證功能正常後再推送
git push origin main
```

### 場景 3：編譯失敗排查
```bash
npm run build
# 檢查 dist/ 目錄是否生成
ls test/dist/
```

---

## 🛑 注意事項

1. **必須提交 dist/ 目錄** 到 Git（目前沒有在 .gitignore 中）
2. **每次代碼變更後**，需要重新編譯：
   ```bash
   npm run build
   git add test/dist
   git commit -m "rebuild"
   ```
3. **不要修改 `.gitignore`** 添加 `dist/`，否則部署會失敗

---

## 🎯 優勢

| 對比項 | 之前 | 現在 |
|------|------|------|
| 部署耗時 | 2-3 分鐘 | ~30 秒 |
| Node.js 依賴安裝 | 是 | 否（如果本地編譯） |
| 網絡超時風險 | 高 | 低 |
| 部署可靠性 | 低 | 高 ✅ |

---

## 回滾方案

如果需要恢復自動編譯（GitHub 上編譯）：

編輯 `.github/workflows/deploy.yml`，移除 "Check for pre-built artifacts" 步驟即可。
