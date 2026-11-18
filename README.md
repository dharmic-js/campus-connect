# Campus Connect • Verified Student Pooling Network

> **A unified, real-time campus pooling network designed exclusively for verified university students.**
> Save money, split rides, pool quick-commerce delivery fees, share night canteen dinners, and rally sports matches.

---

## 🚀 Features

- **🛡️ 100% University Verified**: Instagram-style verified university trust badges backed by student email credentials (.edu / .ac.in).
- **🚗 Cab & Auto Pooling**: Seamless airport, station, and metro cab splits with live vehicle icons, per-person rates, and UPI settlement notes.
- **⚡ Quick Commerce Cart Pooling**: Combine carts on Blinkit, Zepto, and Instamart to bypass surge pricing, delivery fees, and unlock bulk student discounts.
- **🍛 Mess & Late-Night Canteen**: Group Swiggy/Zomato restaurant orders to unlock minimum coupon thresholds (e.g. ₹250 flat off).
- **⚽ Turf & Sports Match Lobby**: Recruit doubles badminton partners, 7v7 turf football players, and indoor stadium squads.
- **✨ Falling Pixel Canvas Logo & Dap-Up Animation**: High-DPI hardware-accelerated 2D canvas with physics-based pixel-fall particle simulation and celebration dap handshake.
- **💬 Live Pool Chat & Web Audio Call Simulator**: In-app encrypted messaging and audio call status for instant campus meetup coordination.
- **📱 Fully Responsive & Touch Optimized**: Butter-smooth 60fps animations across iPhones, Android devices, tablets, and ultra-wide desktops.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas API
- **Backend**: Python 3, FastAPI, Uvicorn, Pydantic
- **Deployment**: Vercel (Edge CDN + Python Serverless Runtime)

---

## 💻 Local Development

### Option A: Running with Python (Full-Stack Mode)
First install Python dependencies:
```bash
pip install -r requirements.txt
```
Build the frontend assets:
```bash
npm install
npm run build
```
Start the Python FastAPI server:
```bash
python app.py
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser!

---

### Option B: Running with Vite (Frontend Hot-Reload Mode)
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** for instant hot module reloading (HMR).

---

## 🌐 Production Build
To create a minified, production-ready static build:
```bash
npm run build
```
Output will be generated in `dist/`.

---

## 📄 License
MIT License. Built for university campus communities.

