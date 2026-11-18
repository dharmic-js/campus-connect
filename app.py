import os
import uvicorn
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="Campus Connect API",
    description="Backend API and web server for Campus Connect - Verified Student Pooling Network",
    version="1.0.0"
)

# Enable CORS for local dev and preview environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class UserProfile(BaseModel):
    name: str = "Aryan K."
    avatar: str = "AK"
    university: str = "IIT / Campus Tech University"
    email: str = "aryan.k26@campus.edu.in"
    department: str = "Computer Science & Engg. (3rd Yr)"
    hometown: str = "Bengaluru, KA"
    hostel: str = "Hostel H4 • Room 212"
    bio: str = "Always down for late-night Blinkit runs, 7v7 turf football, and Friday airport cab splits."
    interests: str = "Football • Cold Brew • Hackathons • F1"
    trustScore: float = 4.92
    poolsJoined: int = 23
    totalSaved: int = 4850

class PoolItem(BaseModel):
    id: str
    category: str
    hostName: str
    hostRating: float = 5.0
    hostTrips: int = 0
    hostAvatar: str
    hostPhone: str
    platform: Optional[str] = None
    routeFrom: Optional[str] = None
    routeTo: Optional[str] = None
    dropLocation: Optional[str] = None
    restaurant: Optional[str] = None
    sportType: Optional[str] = None
    venue: Optional[str] = None
    timeWindow: Optional[str] = None
    totalPrice: Optional[float] = None
    currentCart: Optional[float] = None
    targetCart: Optional[float] = None
    benefitUnlocked: Optional[str] = None
    spotsTotal: Optional[int] = 4
    spotsFilled: Optional[int] = 1
    expectedPerPerson: Optional[float] = 0
    notes: Optional[str] = ""
    joined: bool = False
    agreedContribution: Optional[float] = None
    rated: bool = False
    status: str = "open"

class ChatMessage(BaseModel):
    id: int
    sender: str
    text: str
    time: str
    isSelf: bool = False

# --- In-Memory Database / Seed Data ---
user_profile_db = UserProfile()

pools_db: List[Dict[str, Any]] = [
    {
        "id": "ride-101",
        "category": "rides",
        "hostName": "Aarav Mehta",
        "hostRating": 4.9,
        "hostTrips": 34,
        "hostAvatar": "AM",
        "hostPhone": "+91 98201 •••42",
        "platform": "Uber Premier",
        "routeFrom": "Main Gate (Hostel Block C)",
        "routeTo": "Kempegowda Int. Airport (T2)",
        "timeWindow": "Today, 5:30 PM – 6:00 PM",
        "totalPrice": 1200,
        "spotsTotal": 4,
        "spotsFilled": 2,
        "expectedPerPerson": 300,
        "notes": "Have 1 medium check-in bag. Splitting equally via UPI once trip starts.",
        "joined": False,
        "agreedContribution": 300,
        "rated": False,
        "status": "open"
    },
    {
        "id": "ride-102",
        "category": "rides",
        "hostName": "Sneha Nair",
        "hostRating": 4.8,
        "hostTrips": 19,
        "hostAvatar": "SN",
        "hostPhone": "+91 97114 •••89",
        "platform": "Ola Auto / Mini",
        "routeFrom": "Academic Block 4",
        "routeTo": "Indiranagar Metro Station",
        "timeWindow": "Today, 4:15 PM – 4:30 PM",
        "totalPrice": 240,
        "spotsTotal": 3,
        "spotsFilled": 1,
        "expectedPerPerson": 80,
        "notes": "Heading out right after the 4 PM lecture. Flexible by 10 mins.",
        "joined": False,
        "agreedContribution": 80,
        "rated": False,
        "status": "open"
    },
    {
        "id": "qc-201",
        "category": "market",
        "hostName": "Rohan Deshmukh",
        "hostRating": 5.0,
        "hostTrips": 42,
        "hostAvatar": "RD",
        "hostPhone": "+91 91330 •••12",
        "platform": "Blinkit",
        "dropLocation": "Hostel H8 Common Room",
        "timeWindow": "Ordering in 12 mins",
        "currentCart": 280,
        "targetCart": 499,
        "benefitUnlocked": "Free Delivery + Extra 15% College Off",
        "spotsTotal": 4,
        "spotsFilled": 2,
        "notes": "Adding milk cartons & Maggi. Need ~₹219 more cart value to bypass surge & fee.",
        "joined": False,
        "agreedContribution": 110,
        "rated": False,
        "status": "open"
    },
    {
        "id": "qc-202",
        "category": "market",
        "hostName": "Diya Sen",
        "hostRating": 4.9,
        "hostTrips": 15,
        "hostAvatar": "DS",
        "hostPhone": "+91 96500 •••73",
        "platform": "Zepto",
        "dropLocation": "Girl's Hostel 2 (GH-2 Gate)",
        "timeWindow": "Ordering at 6:00 PM",
        "currentCart": 320,
        "targetCart": 500,
        "benefitUnlocked": "10-Min Rush Free Delivery",
        "spotsTotal": 3,
        "spotsFilled": 2,
        "notes": "Caffeine run (Monster Energy cans + cold brew packs). Add your snacks!",
        "joined": False,
        "agreedContribution": 90,
        "rated": False,
        "status": "open"
    },
    {
        "id": "food-301",
        "category": "food",
        "hostName": "Kabir Verma",
        "hostRating": 4.95,
        "hostTrips": 28,
        "hostAvatar": "KV",
        "hostPhone": "+91 98991 •••55",
        "restaurant": "Meghana Foods / Biryani Hub",
        "platform": "Swiggy",
        "dropLocation": "Hostel H1 Front Porch",
        "timeWindow": "Dinner Order by 8:15 PM",
        "currentCart": 750,
        "targetCart": 1000,
        "benefitUnlocked": "Flat ₹250 Off on ₹1000+ coupon",
        "spotsTotal": 5,
        "spotsFilled": 3,
        "notes": "Already 3 of us ordered boneless biryani handis. Need 1-2 more to unlock coupon.",
        "joined": False,
        "agreedContribution": 180,
        "rated": False,
        "status": "open"
    },
    {
        "id": "sports-401",
        "category": "community",
        "hostName": "Vikramaditya Roy",
        "hostRating": 5.0,
        "hostTrips": 12,
        "hostAvatar": "VR",
        "hostPhone": "+91 98450 •••21",
        "sportType": "7v7 Turf Football",
        "venue": "Campus Main Football Ground / Floodlit Turf",
        "timeWindow": "Tonight, 9:00 PM – 10:30 PM",
        "totalPrice": 1400,
        "spotsTotal": 14,
        "spotsFilled": 11,
        "expectedPerPerson": 100,
        "notes": "Friendly competitive match. Bibs & ball provided. Need 3 defenders / wingers!",
        "joined": False,
        "agreedContribution": 100,
        "rated": False,
        "status": "open"
    },
    {
        "id": "sports-402",
        "category": "community",
        "hostName": "Tanvi Rao",
        "hostRating": 4.85,
        "hostTrips": 9,
        "hostAvatar": "TR",
        "hostPhone": "+91 99002 •••34",
        "sportType": "Badminton Doubles",
        "venue": "Indoor Sports Complex (Court 3)",
        "timeWindow": "Tomorrow Morning, 7:00 AM – 8:00 AM",
        "totalPrice": 400,
        "spotsTotal": 4,
        "spotsFilled": 2,
        "expectedPerPerson": 100,
        "notes": "Looking for 2 doubles partners. Extra racquets available if you need one!",
        "joined": False,
        "agreedContribution": 100,
        "rated": False,
        "status": "open"
    }
]

chat_db: Dict[str, List[Dict[str, Any]]] = {
    "ride-101": [
        {
            "id": 1,
            "sender": "Aarav Mehta",
            "text": "Hey! I will book the Uber 10 mins before 5:30 PM near Block C gate.",
            "time": "5:02 PM",
            "isSelf": False
        }
    ],
    "qc-201": [
        {
            "id": 1,
            "sender": "Rohan Deshmukh",
            "text": "Placing Blinkit in ~10 mins! Drop your item links or names here.",
            "time": "4:48 PM",
            "isSelf": False
        }
    ]
}

# --- API Endpoints ---
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Campus Connect",
        "version": "1.0.0",
        "environment": "production"
    }

@app.get("/api/profile", response_model=UserProfile)
def get_user_profile():
    return user_profile_db

@app.put("/api/profile", response_model=UserProfile)
def update_user_profile(updated: UserProfile):
    global user_profile_db
    user_profile_db = updated
    return user_profile_db

@app.get("/api/pools")
def list_pools(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    results = pools_db
    if category and category != "landing":
        results = [p for p in results if p.get("category") == category]
    if search:
        s = search.lower()
        results = [
            p for p in results
            if s in p.get("hostName", "").lower()
            or s in p.get("routeFrom", "").lower()
            or s in p.get("routeTo", "").lower()
            or s in p.get("platform", "").lower()
            or s in p.get("restaurant", "").lower()
            or s in p.get("sportType", "").lower()
            or s in p.get("venue", "").lower()
        ]
    return results

@app.post("/api/pools")
def create_pool(item: Dict[str, Any]):
    new_id = f"pool-{len(pools_db) + 100}"
    item["id"] = new_id
    item["joined"] = False
    item["rated"] = False
    item["status"] = "open"
    pools_db.insert(0, item)
    return item

@app.put("/api/pools/{pool_id}")
def update_pool(pool_id: str, updates: Dict[str, Any]):
    for i, pool in enumerate(pools_db):
        if pool["id"] == pool_id:
            pools_db[i].update(updates)
            return pools_db[i]
    raise HTTPException(status_code=404, detail="Pool not found")

@app.post("/api/pools/{pool_id}/join")
def join_pool(pool_id: str, payload: Dict[str, Any] = None):
    for i, pool in enumerate(pools_db):
        if pool["id"] == pool_id:
            pool["joined"] = True
            pool["spotsFilled"] = min(pool.get("spotsFilled", 1) + 1, pool.get("spotsTotal", 4))
            if payload and "agreedContribution" in payload:
                pool["agreedContribution"] = payload["agreedContribution"]
            return pool
    raise HTTPException(status_code=404, detail="Pool not found")

@app.get("/api/pools/{pool_id}/messages")
def get_chat_messages(pool_id: str):
    return chat_db.get(pool_id, [])

@app.post("/api/pools/{pool_id}/messages")
def send_chat_message(pool_id: str, message: Dict[str, Any]):
    if pool_id not in chat_db:
        chat_db[pool_id] = []
    new_msg = {
        "id": len(chat_db[pool_id]) + 1,
        "sender": message.get("sender", "You"),
        "text": message.get("text", ""),
        "time": message.get("time", "Just now"),
        "isSelf": True
    }
    chat_db[pool_id].append(new_msg)
    return new_msg

@app.get("/api/leaderboard")
def get_leaderboard():
    return [
        {"rank": 1, "name": "Aryan K.", "avatar": "AK", "trustScore": 4.92, "pools": 23, "savings": 4850},
        {"rank": 2, "name": "Aarav Mehta", "avatar": "AM", "trustScore": 4.90, "pools": 34, "savings": 7200},
        {"rank": 3, "name": "Rohan Deshmukh", "avatar": "RD", "trustScore": 5.00, "pools": 42, "savings": 6100},
        {"rank": 4, "name": "Sneha Nair", "avatar": "SN", "trustScore": 4.80, "pools": 19, "savings": 3400},
        {"rank": 5, "name": "Vikramaditya Roy", "avatar": "VR", "trustScore": 5.00, "pools": 12, "savings": 2800},
    ]

# --- Static File Serving (for Frontend Production Build) ---
dist_path = os.path.join(os.path.dirname(__file__), "dist")
if os.path.exists(dist_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_frontend(full_path: str):
        file_path = os.path.join(dist_path, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_path, "index.html"))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Campus Connect Full-Stack Python Server running at http://localhost:{port}")
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)
