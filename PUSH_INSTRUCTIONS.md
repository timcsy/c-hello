# 推送到 GitHub 的說明

## 當前狀態

✅ **本地開發完成**
- 所有源代碼已實現
- 所有文檔已完整
- 本地構建已驗證 (npm run build ✓)
- 本地提交已完成 (commit 950f860)

⏳ **等待推送到 GitHub**
- 1 個提交準備推送
- 需要 GitHub 認證

## 推送方法

### 方法 A: 使用 HTTPS（需要個人存取令牌）

```bash
cd /workspaces/c-hello
git push origin main
```

然後輸入：
- **用戶名**: `timcsy`
- **密碼/PAT**: 你的 GitHub 個人存取令牌

### 方法 B: 使用 SSH（推薦）

```bash
# 1. 設置 SSH 遠程
git remote set-url origin git@github.com:timcsy/c-hello.git

# 2. 推送
git push origin main
```

### 方法 C: 使用 GitHub CLI

```bash
# 1. 安裝 GitHub CLI (如未安裝)
# https://cli.github.com

# 2. 登錄
gh auth login

# 3. 推送
git push origin main
```

## 推送後會發生什麼

1. **GitHub 接收更新** (~5 秒)
2. **GitHub Actions 自動觸發**
   - 檢出代碼
   - 安裝依賴
   - 執行 `npm run build`
   - 部署到 GitHub Pages
3. **網站上線** (~2 分鐘)
   - 訪問: https://timcsy.github.io/c-hello/

## 監控部署

### 查看 GitHub Actions 進度

訪問: https://github.com/timcsy/c-hello/actions

### 查看部署日誌

1. 前往 Actions
2. 點擊 "Deploy to GitHub Pages" 工作流
3. 點擊最新的運行
4. 查看「Build and Deploy」job 的日誌

### 驗證網站上線

- 構建成功後，訪問: https://timcsy.github.io/c-hello/
- 檢查功能是否正常：
  - 能否輸入摩斯碼
  - 音頻是否播放
  - 參數是否可調整
  - 挑戰模式是否運作

## 故障排除

### 推送失敗：認證錯誤

**症狀**: "Authentication failed"

**解決**:
```bash
# 使用 GitHub CLI
gh auth login

# 或清除舊認證並重新設置
git credential reject https://github.com
```

### 推送失敗：連接超時

**症狀**: "Operation timed out"

**解決**:
```bash
# 檢查網絡連接
ping github.com

# 如果是 HTTPS 超時，改用 SSH
git remote set-url origin git@github.com:timcsy/c-hello.git
git push origin main
```

### 部署失敗：GitHub Actions 錯誤

**症狀**: Actions 工作流失敗

**檢查**:
1. 查看 Actions 日誌中的錯誤信息
2. 常見原因：
   - npm install 失敗 → 檢查 package.json
   - 構建失敗 → 檢查 vite.config.js
   - 部署失敗 → 檢查 GitHub Pages 設置

## 相關連結

- 倉庫: https://github.com/timcsy/c-hello
- 網站: https://timcsy.github.io/c-hello/
- Actions: https://github.com/timcsy/c-hello/actions
- Settings: https://github.com/timcsy/c-hello/settings/pages

## 檢查清單

推送前：
- [ ] 本地構建成功 (`npm run build`)
- [ ] 所有文件已提交 (`git status` 顯示乾淨)
- [ ] 提交信息清楚
- [ ] 已檢查代碼無誤

推送後：
- [ ] GitHub Actions 工作流成功
- [ ] 網站可在 GitHub Pages 訪問
- [ ] 功能測試通過
- [ ] 資源加載正確

---

**準備好了嗎？執行 `git push origin main` 開始部署！** 🚀
