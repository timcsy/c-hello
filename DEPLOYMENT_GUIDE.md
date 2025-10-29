# 摩斯密碼練習網站 - 部署指南

## 📋 前置條件

- Git 已安裝
- Node.js 20+ 已安裝 (可選，GitHub Actions 會自動安裝)
- GitHub 帳戶

## 🚀 快速部署步驟

### 步驟 1: 本地驗證 (可選)

```bash
# 進入項目目錄
cd test

# 安裝依賴
npm install

# 構建生產版本
npm run build

# 預覽構建結果 (http://localhost:4173)
npm run preview
```

### 步驟 2: 推送到 GitHub

```bash
# 確保在主分支
git checkout main

# 提交所有更改
git add -A
git commit -m "feat: complete morse code trainer implementation"

# 推送到 GitHub
git push origin main
```

### 步驟 3: 設定 GitHub Pages

1. 前往 GitHub 倉庫設定: https://github.com/timcsy/c-hello/settings/pages
2. 在「Source」(來源) 中選擇：
   - **Branch**: `main`
   - **Folder**: `/` (根目錄) - 注意：GitHub Actions 會自動部署到 `gh-pages` 分支
3. 點擊「Save」

### 步驟 4: 監控部署

1. 前往 GitHub Actions: https://github.com/timcsy/c-hello/actions
2. 查看「Deploy to GitHub Pages」工作流執行
3. 等待工作流完成 (通常需要 1-2 分鐘)

### 步驟 5: 訪問網站

部署完成後，訪問：
```
https://timcsy.github.io/c-hello/
```

## 📊 工作流運作流程

GitHub Actions 工作流 (`deploy.yml`) 執行以下步驟：

1. **簽出代碼**: 從 main 分支獲取最新代碼
2. **設置 Node.js**: 安裝 Node.js 20
3. **安裝依賴**: `npm install`
4. **構建**: `npm run build` 生成 dist/
5. **配置 Pages**: 設定 GitHub Pages 環境
6. **上傳產物**: 上傳 dist/ 至 Pages 部署
7. **自動部署**: GitHub Pages 自動部署

## ✅ 部署驗證清單

### 構建驗證
- [ ] `npm run build` 無錯誤
- [ ] `dist/` 目錄包含 3 個文件：
  - `index.html` (~5KB)
  - `assets/index-*.js` (~11KB)
  - `assets/index-*.css` (~10KB)

### GitHub Actions 驗證
- [ ] Actions 工作流成功 (綠色✓)
- [ ] 日誌中無錯誤或警告
- [ ] 部署耗時 < 3 分鐘

### 功能驗證
- [ ] 網站可訪問
- [ ] 頁面正確加載
- [ ] 鍵盤輸入有效
- [ ] 音頻反饋工作
- [ ] 參數調整生效
- [ ] 挑戰模式可用

## 🔧 故障排除

### 問題 1: 工作流失敗

**症狀**: GitHub Actions 工作流失敗

**解決方案**:
1. 檢查 Actions 日誌中的錯誤
2. 常見原因：
   - 依賴安裝失敗 → 刪除 `node_modules` 和 `package-lock.json` 重試
   - 構建失敗 → 本地 `npm run build` 驗證
   - 部署路徑錯誤 → 檢查 `vite.config.js` 中的 `base` 設置

### 問題 2: 資源加載失敗 (404)

**症狀**: CSS 或 JS 無法加載

**原因**: 資源路徑配置錯誤

**解決方案**:
檢查 `vite.config.js`：
```javascript
base: '/c-hello/'  // 應該是 /倉庫名/
```

### 問題 3: 網站無法訪問

**症狀**: 頁面不存在 (404)

**原因**: GitHub Pages 未啟用或配置錯誤

**解決方案**:
1. 確認 Pages 已啟用 (Settings > Pages)
2. 查看工作流日誌，確認部署完成
3. 等待 DNS 傳播 (通常 < 1 分鐘)
4. 嘗試清除瀏覽器快取

### 問題 4: 本地開發問題

**npm install 失敗**:
```bash
# 嘗試清除 npm 快取
npm cache clean --force
rm -rf node_modules package-lock.json

# 重新安裝
npm install
```

**構建失敗**:
```bash
# 檢查 Node.js 版本
node --version  # 應為 20+

# 使用 sudo 安裝 (如果權限問題)
sudo npm install --save-dev terser
npm run build
```

## 📈 監控部署

### 自動化監控

每次推送到 main 分支時，GitHub Actions 自動：
1. 構建項目
2. 運行測試 (如有)
3. 部署到 GitHub Pages

### 手動檢查

訪問 GitHub 檢查工作流狀態：
```
https://github.com/timcsy/c-hello/actions/workflows/deploy.yml
```

## 🔒 安全注意事項

1. **不要提交密鑰**: `credentials.json` 等敏感文件
2. **使用 .gitignore**: 排除 `node_modules/`, `dist/`, `.env`
3. **保持依賴最新**: 定期 `npm audit` 並修復漏洞
4. **限制 Pages 訪問** (可選): Settings > Pages > Restrict access

## 📱 跨域部署

若要在不同域名部署，修改 `vite.config.js`：

```javascript
// 部署到 timcsy.github.io 根域
export default defineConfig({
  base: '/',
  // ...
});

// 部署到其他服務 (如 Netlify)
// 只需修改 base 路徑即可
```

## 💾 備份與恢復

### 備份當前構建

```bash
# 備份 dist/ 目錄
cp -r test/dist test/dist.backup

# 提交備份提示
git tag -a v0.1.0-stable -m "Stable release"
git push origin v0.1.0-stable
```

### 回滾到之前版本

```bash
# 查看發佈歷史
git log --oneline

# 回滾到特定提交
git revert <commit-hash>
git push origin main

# GitHub Actions 將自動重新部署
```

## 📞 常見問題 (FAQ)

**Q: 每次推送都會部署嗎?**  
A: 是的，只要推送到 main 分支，GitHub Actions 就會自動構建並部署。

**Q: 部署需要多長時間?**  
A: 通常 1-2 分鐘。安裝依賴可能需要額外時間，首次部署較慢。

**Q: 如何禁止自動部署?**  
A: 臨時停用工作流：Actions > Deploy to GitHub Pages > ... > Disable workflow

**Q: 可以從其他分支部署嗎?**  
A: 可以，編輯 `.github/workflows/deploy.yml` 修改 `branches` 列表。

**Q: 支援自訂域名嗎?**  
A: 支援。在 Pages 設定中配置，或在 dist/ 目錄添加 CNAME 文件。

## 🎓 最佳實踐

1. **定期提交**: 小幅改變頻繁提交
2. **使用版本標籤**: `git tag v0.1.0` 標記發佈版本
3. **監控部署狀態**: 檢查 Actions 日誌確認部署成功
4. **測試本地構建**: 部署前本地 `npm run build` 驗證
5. **保持依賴最新**: 定期 `npm update` 和 `npm audit fix`

## 📚 相關資源

- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Node.js 文檔](https://nodejs.org/)

---

**最後更新**: 2025-10-29  
**版本**: 0.1.0
