# LINE Bot × Google Apps Script × Google Sheet 自動化整合教學

本專案示範如何使用 **Google Apps Script (GAS)** 連接 **LINE Messaging API** 與 **Google Sheet**，讓 LINE Bot 能透過對話自動查詢或新增試算表資料。

---

## 🎯 功能說明

1. 只有當訊息中包含 `@bot` 時才會觸發動作。
2. 可透過 LINE Bot 查詢試算表中符合名稱的資料。
3. 可透過 LINE Bot 在試算表中新增一列資料。

> 💡 **說明**：  
> `getSheet()` 與 `updateSheet()` 僅提供最基本的查詢與新增範例。  
> 請根據實際需求（如欄位結構、查詢條件、格式檢核）進行客製化調整。

---

## 前置準備

- Google 帳號（用於建立試算表與 GAS 專案）
- 一份 Google 試算表（Google Sheet）
- LINE Developers 帳號與 Messaging API Channel

---

## Step 1：建立 Google Sheet 並取得 ID

1. 前往 [Google Sheet](https://sheets.google.com/) 新增試算表。
2. 建立一份試算表（例如命名為 `LineBotData`）。
3. 試算表網址格式如下：
   ```
   https://docs.google.com/spreadsheets/d/1AbCdEfG1234567890/edit#gid=0
   ```
   其中的 **1AbCdEfG1234567890** 即為 **試算表 ID**。

---

## 💻 Step 2：建立 Google Apps Script 專案

1. 在試算表中，點選上方功能列 **擴充功能 → Apps Script**。
2. 刪除預設內容，貼上以上完整程式碼：

---

## Step 3： 取得 LINE Bot Token 與 Secret

1. 前往 [LINE Developers Console](https://developers.line.biz/console/)
2. 建立或選擇一個 Provider
3. 新增 Messaging API Channel
4. 在 Channel 設定頁面中取得：
   - **Channel access token**
5. 將這些值填入 GAS 程式中的變數，例如：
   ```js
   var lineToken = "YOUR_ACCESS_TOKEN"; // REPLACE TO YOUR OWN LINE BOT TOKEN
   ```

---

## Step 4：部署為網頁應用程式

1. 點選 **部署 → 新部署**。
2. 選擇 **網頁應用程式 (Web App)**。
3. 設定以下選項：
   - **執行身份**：我自己
   - **存取權限**：任何人（甚至匿名）
4. 按下 **部署** 並授權。
5. 取得 **網頁應用程式 URL**，格式如下：
   ```
   https://script.google.com/macros/s/AKfycbx1234567890/exec
   ```

---

## Step 5：設定 LINE Webhook

1. 登入 [LINE Developers Console](https://developers.line.biz/console/)。
2. 進入你的 Messaging API Channel。
3. 將上方取得的 Apps Script URL 填入 **Webhook URL**。
4. 啟用 Webhook 並儲存設定。

---

## 🧠 使用範例

| 指令                     | 功能                            | 範例                     |
| ------------------------ | ------------------------------- | ------------------------ |
| `@bot 查詢 apple`        | 查詢試算表中包含 "apple" 的資料 | 若找到則回傳該儲存格內容 |
| `@bot 新增 apple,10,red` | 在試算表中新增一列資料          | 新增 `[apple, 10, red]`  |

---

## 📄 試算表欄位設計建議

你可以先建立如下欄位結構以便測試：

| 商品名稱 | 數量 | 顏色   |
| -------- | ---- | ------ |
| apple    | 5    | red    |
| banana   | 8    | yellow |

---

## ✅ 測試方式

1. 加入你的 LINE Bot。
2. 傳送訊息：
   - `@bot 查詢 apple`
   - `@bot 新增 grape,12,purple`
3. Bot 會自動回覆查詢或新增結果。

---

## 📚 延伸閱讀

- [LINE Messaging API 官方文件](https://developers.line.biz/en/docs/messaging-api/)
- [Google Apps Script 官方文件](https://developers.google.com/apps-script)
- [Google Sheet App Script 教學](https://developers.google.com/apps-script/guides/sheets)

<br>
<br>
<br>

# LINE Bot × Google Apps Script × Google Sheet Integration Guide

This project demonstrates how to use **Google Apps Script (GAS)** to integrate the **LINE Messaging API** with **Google Sheets**, enabling a LINE Bot to automatically **query** or **update** spreadsheet data through chat commands.

> 💡 **Note:**  
> The provided `getSheet()` and `updateSheet()` functions are **basic examples** for data retrieval and insertion.  
> You should **customize them** based on your actual needs (e.g., sheet structure, search logic, validation rules, or data format).

---

## 🎯 Features

1. The bot only responds when the message contains `@bot`.
2. Retrieve specific data from a Google Sheet via LINE messages.
3. Update or insert data into a Google Sheet directly from LINE.

---

## 📋 Prerequisites

- A Google account (for creating the Sheet and Apps Script project)
- A Google Sheet (e.g., `LineBotData`)
- A LINE Developers account with a **Messaging API Channel**

---

## Step 1: Create a Google Sheet and Get Its ID

1. Go to [Google Sheets](https://sheets.google.com/) and create a new spreadsheet.
2. Name it, for example, `LineBotData`.
3. Open the sheet and note its URL, e.g.:
   ```
   https://docs.google.com/spreadsheets/d/1AbCdEfG1234567890/edit#gid=0
   ```
4. The string **1AbCdEfG1234567890** is your **Sheet ID**.

---

## Step 2: Create a Google Apps Script Project

1. In your Google Sheet, click **Extensions → Apps Script**.
2. In the newly opened Apps Script editor, delete the default content.
3. Paste your custom script (including `getSheet()`, `updateSheet()`, and `doPost()` functions).

---

## Step 3: Get LINE Bot Token and Secret

1. Go to the [LINE Developers Console](https://developers.line.biz/console/).
2. Create or select an existing **Provider**.
3. Add a new **Messaging API Channel**.
4. In the Channel settings page, you’ll find:
   - **Channel access token**
5. Copy these values and paste them into your Google Apps Script as variables, for example:
   ```js
   var lineToken = "YOUR_ACCESS_TOKEN"; // REPLACE TO YOUR OWN LINE BOT TOKEN
   ```

---

## Step 4: Deploy as a Web App

1. Click **Deploy → New Deployment**.
2. Under “Select type,” choose **Web App**.
3. Configure the following options:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. You will be asked to grant permissions — follow the prompts.
6. Once completed, you’ll see a **Web App URL**, for example:
   ```
   https://script.google.com/macros/s/AKfycbx1234567890/exec
   ```
   Copy this URL — you’ll use it later as your LINE Webhook endpoint.

---

## Step 5: Set Up the LINE Webhook

1. Go to [LINE Developers Console](https://developers.line.biz/console/).
2. Open your **Messaging API Channel**.
3. In the **Webhook URL** field, paste your Web App URL.
4. Click **Enable Webhook**.
5. Save your settings — your LINE Bot is now connected!

---

## 🧠 Example Commands

| Command             | Description                                  | Example |
| ------------------- | -------------------------------------------- | ------- |
| `@bot query A2`     | Retrieve the value from cell A2 in the sheet |         |
| `@bot update A2=Hi` | Update the value of cell A2 to “Hi”          |         |

---

## ✅ Testing

1. Add your LINE Bot as a friend.
2. Send a message like `@bot query A2`.
3. The bot should reply with the value stored in that cell.

---

## 📚 References

- [LINE Messaging API Documentation](https://developers.line.biz/en/docs/messaging-api/)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets App Script Guide](https://developers.google.com/apps-script/guides/sheets)
