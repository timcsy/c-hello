# C-Hello 專案憲法

<!--
Sync Impact Report
===================
Version: 0.1.0 (初始版本)
Date: 2025-10-29
Changes:
- Created initial constitution for C-Hello project
- Established documentation language (Traditional Chinese)
- Defined GitHub Pages deployment requirements
- Set quality and documentation standards
-->

## 核心原則

### I. 繁體中文規格文檔

所有規格、設計文檔、使用者故事、驗收標準 MUST 使用繁體中文撰寫。代碼註解與 README 可使用英文，但專案文檔必須是完整、清晰的繁體中文。此原則確保本地化體驗一致，降低誤解風險。

### II. GitHub Pages 可部署性

Build 產物 MUST 完全相容於 GitHub Pages。這意味著：
- 所有靜態資源（HTML、CSS、JavaScript）MUST 能直接部署
- 不依賴伺服器端邏輯或動態後端
- 相對路徑和資源連結 MUST 相容於子目錄部署
- Build 流程 MUST 在標準環境下成功執行

### III. 文檔優先開發

每個功能或變更 MUST 先有完整的繁體中文規格文檔，包含：
- 功能描述
- 使用者故事與驗收標準
- 邊界條件與例外
- 測試計畫

### IV. 自動化與測試

Build 流程 MUST 包含自動化測試與驗證。所有產生的成果物 MUST 通過驗收測試，確保部署到 GitHub Pages 前品質合格。

## 開發與部署流程

### 規格到實現的工作流

1. **規格階段** (`specs/spec.md`)
   - 繁體中文撰寫完整功能需求
   - 列出所有使用者故事與驗收條件

2. **計畫階段** (`specs/plan.md`)
   - 技術架構與工具選擇
   - 建構步驟與最終產物說明

3. **任務階段** (`specs/tasks.md`)
   - 分解為可執行的單位任務
   - 標記依賴關係與並行標記

4. **實現階段**
   - 按任務執行、測試、驗收
   - Build 產物可直接部署至 GitHub Pages

### Build 要求

- Build 命令 MUST 從專案根目錄執行成功
- 產物位置 MUST 清晰標示（通常為 `dist/` 或 `build/` 目錄）
- Build 過程 MUST 包含驗證步驟
- 所有依賴 MUST 自動解析（例如 npm install、pip install 等）

## GitHub Pages 部署標準

### 資源與路徑

- 所有資源連結 MUST 使用相對路徑或環境變數
- 無須後端伺服器，純靜態檔案部署
- 支援的格式：HTML、CSS、JavaScript、圖片、文件等靜態資源

### 驗收測試

- 部署前 MUST 驗證所有連結有效
- 頁面載入 MUST 無控制台錯誤
- 響應式設計 MUST 適配常見螢幕尺寸

## 治理

**憲法權威**：本憲法是本專案開發的最高指導原則，優先於所有其他實踐與指南。

**修訂流程**：
- 原則變更 MUST 明確記錄修訂理由
- 版本控制 MUST 遵循語義版本規則：
  - MAJOR：原則移除或重新定義
  - MINOR：新原則或顯著擴展
  - PATCH：措辭改進、澄清、無語義變化

**合規性檢查**：
- 所有規格與計畫 MUST 驗證憲法一致性
- Build 與部署 MUST 遵守 GitHub Pages 相容性原則
- 任何偏離 MUST 明確記錄與批准

**版本**: 0.1.0 | **批准日期**: 2025-10-29 | **最後修訂**: 2025-10-29
