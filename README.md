# Stock-Month-Revenue

## 一個顯示台股每月營收及單月營收年增率的網頁

## 說明

使用 Next.js 開發一個抓取 FinMind API 資料的網頁，用以顯示台股的每月營收及單月營收年增率

### 使用

- 使用網頁上的搜尋列輸入台股代號，點擊搜尋即可查看資料
- 也可以在網址後加上代號以查看 eg. `/2330`

## 開發相關

### 指令

- 開發: `yarn dev`
- 部屬: `yarn && yarn build`

### 使用套件

- `material-ui`
- `chart.js`
- `date-fns`
- `react-chartjs-2`
- `zustand`

### 部屬

- 環境變數: `NEXT_PUBLIC_FINMIND_API_URL`, `NEXT_PUBLIC_FINMIND_API_TOKEN`

### Screenshot

![](https://i.imgur.com/Ht8FS1N.png)
