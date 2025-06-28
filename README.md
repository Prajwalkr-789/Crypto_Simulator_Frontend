# 🪙 Crypto Trading Simulator (Next.js)

A full-stack **Crypto Trading Simulator** built with **Next.js** and **Node.js**, where users can virtually trade cryptocurrencies using live price data. Includes real-time portfolio tracking, transaction history, and a backend price worker — no real money involved.

![Screenshot](https://github.com/user-attachments/assets/d09c2ad5-d553-473a-80ff-823e6f0a7b99)

---

## 🌐 Live Demo

🔗 [Live App (Frontend - Vercel)](https://crypto-simulator-frontend.vercel.app/)  

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login/signup flow
- Passwords hashed with bcrypt

### 📈 Crypto Market Prices
- Real-time price updates via worker
- Redis Pub/Sub used to broadcast prices across users

### 💰 Simulated Trading
- Buy/sell crypto with a virtual wallet
- Auto-calculated portfolio value based on live prices
- Transaction log with timestamps and quantities

### 📊 Portfolio View
- Holdings summary
- Profit/Loss based on market changes
- Simple charts or asset tables
- 
### 🧾 Transaction History
- Logs every buy/sell with timestamps and prices
- Viewable in a sortable table

### 📰 Crypto News Feed
- Dedicated `/news` page showing top market headlines
- `/newsdetails` page to view full article summaries
- Fetched via external crypto news API (e.g. NewsAPI, CryptoCompare)
---

## 🛠️ Tech Stack

| Layer        | Tech                                             |
|--------------|--------------------------------------------------|
| Frontend     | **Next.js (App Router)**, Tailwind CSS, Axios    |
| Backend      | Node.js, Express, MongoDB, JWT                   |
| Realtime     | Redis Pub/Sub for price broadcasting             |
| Price Sync   | Background Worker / Cron Scheduler               |
| Charts       | Recharts (for portfolio stats, P&L visualization)|
| News Feed    | Crypto News API integration                      |
| Hosting      | Vercel (frontend), Render (backend)              |

---

## 📁 Project Structure

### Frontend (`NextJS`)

```txt
/app
  ├─ /cryptodetails/[coin]     → Detailed coin info page
  ├─ /cryptopricepage          → All coin prices listing
  ├─ /dashboard                → User's portfolio & stats
  ├─ /news                     → Crypto news listing
  ├─ /newsdetails              → Individual news detail page
  ├─ /signin                   → Login form
  ├─ /signup                   → Registration form
  ├─ /trade/[id]               → Trade simulator for a specific coin
  └─ /transactions             → User's transaction history

/Components                    → UI elements (Navbar, etc.)
/Contexts                      → Global state/context providers
```
## 🧪 Setup Instructions

```bash
git clone https://github.com/your-username/crypto-simulator-frontend
cd crypto-simulator-frontend
npm install
npm run dev
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com / http://localhost:8080/

🔗 [Github Link (Backend)](https://github.com/Prajwalkr-789/Crypto_Simulator_Backend)  



