# Smart Travel Recommendation System

A full-stack MERN travel recommendation app with React, Vite, TypeScript, Express, MongoDB Atlas, authentication, OpenWeatherMap weather lookup, Google Maps search links, favorites, and a modern glassmorphism UI.

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express.js
- Database: MongoDB Atlas, database `tourism`, collection `places`
- APIs: OpenWeatherMap, Google Maps search links

## Folder Structure

```text
.
├── src
│   ├── api
│   │   └── client.ts
│   ├── components
│   │   ├── Navbar.tsx
│   │   └── PlaceCard.tsx
│   ├── context
│   │   └── AuthContext.tsx
│   ├── pages
│   │   ├── Favorites.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Recommendation.tsx
│   │   └── Register.tsx
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── backend
│   ├── data
│   │   └── places.js
│   ├── models
│   │   ├── Place.js
│   │   └── User.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── places.js
│   │   └── weather.js
│   ├── scripts
│   │   └── seedPlaces.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .env.example
├── package.json
└── vite.config.ts
```

## MongoDB Schema

`tourism.places`

```js
{
  name: String,
  region: 'North' | 'South' | 'East' | 'West',
  budget: 'Low' | 'Medium' | 'High',
  description: String,
  image: String,
  location: String
}
```

`users`

```js
{
  name: String,
  email: String,
  password: String // bcryptjs hash
}
```

## Environment

Frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Backend `backend/.env`:

```env
PORT=3001
MONGO_URI=your_mongodb_uri
WEATHER_API_KEY=9a0f269abd263cf49a91caa080d7c804
JWT_SECRET=replace_with_a_long_random_secret
```

For MongoDB Atlas, use the `tourism` database in your connection string:

```env
MONGO_URI=mongodb+srv://tourism:tourism123@cluster0.kpp9j1o.mongodb.net/tourism?retryWrites=true&w=majority
```

## Installation

```bash
npm install
cd backend
npm install
cd ..
```

## Seed MongoDB

After setting `backend/.env` with your real MongoDB Atlas URI:

```bash
npm run seed
```

The seed script inserts 60 unique places, 5 for every region and budget combination.

## Run Locally

Terminal 1:

```bash
npm run server
```

Terminal 2:

```bash
npm run dev
```

Open `http://localhost:5173`.

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/places?region=North&budget=Low`
- `GET /api/weather?location=Rishikesh%2C%20Uttarakhand`

## Build

```bash
npm run build
```

## Sample Place Document

```json
{
  "name": "Rishikesh Ghats",
  "region": "North",
  "budget": "Low",
  "description": "A spiritual adventure hub known for river rafting, yoga retreats, suspension bridges, and lively Ganga aarti evenings. Budget stays and street food make it friendly for young travelers.",
  "image": "https://source.unsplash.com/1200x820/?Rishikesh%20Ghats%20travel%20India%20landscape",
  "location": "Rishikesh, Uttarakhand"
}
```
