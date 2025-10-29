# 實現計畫：摩斯密碼練習網站

**分支**: `morse-code-trainer` | **日期**: 2025-10-29 | **規格**: `/specs/spec.md`

**輸入**: 功能規格來自 `/specs/spec.md`

## 摘要

構建一個全功能的摩斯密碼練習網站，支援鍵盤與觸控輸入、實時音頻反饋、可調時間參數，以及完整的 GitHub Pages 自動部署。採用純前端技術棧（HTML + CSS + JavaScript），無後端依賴，確保完全靜態部署相容性。

## 技術背景

**語言/版本**: HTML5 + CSS3 + JavaScript (ES2020+)  
**主要依賴**: Web Audio API (原生)、Touch Events API (原生)、LocalStorage (原生)  
**存儲**: 瀏覽器 LocalStorage (用戶偏好設定)  
**測試**: Jest (單位測試)、Playwright (E2E 測試)  
**目標平台**: 跨瀏覽器 Web (桌面 + 行動)  
**專案類型**: 單一網頁應用 (SPA)  
**效能目標**: 頁面加載 < 2秒、音頻延遲 < 50ms、解碼時間 < 10ms  
**約束條件**: < 100KB 頁面資源、< 50MB 記憶體使用、完全離線可用  
**規模/範圍**: 單頁應用、10+ 練習模式、100+ 摩斯碼詞典項目

## 憲法檢查

**閘口**: Phase 0 研究前必須通過。Phase 1 設計後重新檢查。

### 原則檢查

✅ **I. 繁體中文規格文檔**
- 規格文檔完全使用繁體中文撰寫
- 所有功能需求、使用者故事、驗收標準均清晰定義

✅ **II. GitHub Pages 可部署性**
- 純前端實現，無後端邏輯
- 所有資源將使用相對路徑
- Build 流程自動生成靜態 HTML/CSS/JS
- GitHub Actions 工作流自動部署至 Pages

✅ **III. 文檔優先開發**
- 規格文檔已完成，包含所有必要細節
- 計畫文檔定義清晰的技術架構
- 任務分解將遵循已定義的需求

✅ **IV. 自動化與測試**
- Build 流程包含自動測試
- GitHub Actions 提供持續整合與部署
- 所有成果物經過驗證後才部署

## 專案結構

### 文檔 (此功能)

```text
specs/
├── spec.md              # 功能規格 (已完成)
├── plan.md              # 本計畫文檔
├── research.md          # Phase 0 輸出 (技術研究)
├── data-model.md        # Phase 1 輸出 (資料模型)
├── quickstart.md        # Phase 1 輸出 (快速開始)
├── contracts/           # Phase 1 輸出 (API 合約)
└── tasks.md             # Phase 2 輸出 (任務分解)
```

### 源代碼 (專案根目錄)

```text
.
├── src/
│   ├── index.html           # 主 HTML 頁面
│   ├── styles/
│   │   ├── main.css         # 主樣式表
│   │   ├── responsive.css   # 響應式設計
│   │   └── accessibility.css # 無障礙支持
│   ├── js/
│   │   ├── app.js           # 應用主邏輯
│   │   ├── morse-encoder.js # 摩斯編碼模組
│   │   ├── morse-decoder.js # 摩斯解碼模組
│   │   ├── audio-engine.js  # 音頻引擎
│   │   ├── ui-controller.js # UI 控制器
│   │   ├── input-handler.js # 輸入處理 (鍵盤 + 觸控)
│   │   └── storage.js       # LocalStorage 管理
│   └── assets/
│       ├── icons/
│       └── fonts/
│
├── tests/
│   ├── unit/
│   │   ├── morse-encoder.test.js
│   │   ├── morse-decoder.test.js
│   │   └── audio-engine.test.js
│   ├── e2e/
│   │   └── user-workflow.spec.js
│   └── integration/
│       └── full-flow.test.js
│
├── build/                   # Build 輸出目錄 (自動生成)
├── dist/                    # 最終部署產物
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 部署工作流
├── package.json
├── webpack.config.js        # 或其他打包工具配置
└── README.md
```

**結構決定**: 採用單一 SPA 結構，所有資源集中在 `src/` 目錄，利用 webpack 或 Vite 進行打包優化。Build 流程生成 `dist/` 目錄作為 GitHub Pages 部署源。

## 複雜度追蹤

無憲法檢查違反，無需額外複雜度說明。

## 技術決策

### TD-1: 前端技術棧選擇
- **決定**: 使用原生 JavaScript + HTML5 + CSS3，無需額外框架
- **理由**: 
  - 最小化依賴，降低打包體積
  - 完全控制渲染流程，確保效能
  - 簡化 GitHub Pages 部署流程
  - 適合小型單頁應用

### TD-2: 音頻實現
- **決定**: Web Audio API 原生實現
- **理由**:
  - 低延遲 (< 50ms 目標)
  - 無需外部音頻庫
  - 跨瀏覽器支援完善

### TD-3: 儲存方案
- **決定**: 瀏覽器 LocalStorage (用戶偏好設定)
- **理由**:
  - 無後端依賴
  - 用戶偏好本地持久化
  - 無隱私洩露風險

### TD-4: 打包工具
- **決定**: Vite
- **理由**:
  - 快速開發熱更新
  - 優化的 build 輸出
  - 對 GitHub Pages 友善的預設配置
  - 零配置上手，適合此規模專案

### TD-5: 部署流程
- **決定**: GitHub Actions + GitHub Pages
- **理由**:
  - 無成本 (GitHub 免費服務)
  - 完全自動化
  - 與版本控制緊密集成
  - 無額外部署基礎設施

## 相依性與約束

### 外部相依
- Web Audio API (現代瀏覽器均支援)
- Touch Events API (行動設備支援)
- LocalStorage API (現代瀏覽器均支援)

### 內部相依
1. 摩斯編碼/解碼模組 (核心邏輯，優先開發)
2. 音頻引擎 (依賴編碼模組)
3. 輸入處理器 (依賴音頻引擎)
4. UI 控制器 (整合所有模組)
5. 應用主邏輯 (協調各模組)

## Phase 0: 研究與澄清

### 需澄清項目

1. **測試框架選擇**: Jest vs Vitest vs Playwright 組合
   - 待決: 基於構建工具選擇（已選定 Vite，建議 Vitest）

2. **CSS 預處理**: 純 CSS vs SCSS vs 其他
   - 建議: 純 CSS (無額外依賴)

### 研究任務

- [ ] 研究 Web Audio API 摩斯音頻實現最佳實踐
- [ ] 研究跨瀏覽器 Touch Events 實現
- [ ] 研究 GitHub Actions 靜態部署工作流最佳實踐
- [ ] 研究 WCAG 2.1 AA 無障礙實現指南

## Phase 1: 設計與合約

### 設計交付物

1. **research.md** - 技術研究結論
2. **data-model.md** - 摩斯碼字典、使用者偏好資料結構
3. **contracts/morse-api.md** - 各模組的公開介面定義
4. **quickstart.md** - 開發環境設置與本地執行指南

### 設計檢查點

- [ ] 所有技術選擇決策已記錄
- [ ] 資料模型與摩斯碼字典完整
- [ ] 模組介面清晰定義
- [ ] 無後端依賴確認
- [ ] GitHub Pages 相容性確認

## Phase 2: 任務分解

*(由 `/speckit.tasks` 命令執行)*

任務將分為以下類別：
1. **基礎設施** (Build、測試、部署)
2. **核心邏輯** (摩斯編解碼、音頻引擎)
3. **前端 UI** (HTML、CSS、使用者互動)
4. **測試** (單位、整合、E2E)
5. **部署** (GitHub Actions 工作流、Pages 配置)

## 已知風險與緩解

| 風險 | 可能性 | 影響 | 緩解措施 |
|------|--------|------|---------|
| 音頻延遲超過 50ms | 中 | 使用者體驗受損 | 提前進行效能測試，必要時採用優化技術 |
| 跨瀏覽器相容性問題 | 低 | 某些使用者無法使用 | 使用標準 API，廣泛測試 |
| 觸控輸入識別問題 | 低 | 行動用戶受影響 | 充分測試各類設備與瀏覽器 |
| GitHub Pages 部署失敗 | 極低 | 發佈延遲 | 建立部署驗證流程，提前測試工作流 |

## 下一步行動

1. 執行 `/speckit.plan` 命令生成 `research.md`
2. 進行技術研究與決策 (打包工具、測試框架等)
3. 生成 `data-model.md` 與 `contracts/`
4. 執行 `/speckit.tasks` 命令分解具體任務
5. 開始實現迭代
