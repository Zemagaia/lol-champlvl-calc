# Gold Value of Level Checker
A very janky tool, made to check the cumulative Gold value of champion levels.

Calculates with:
- Health
- Health Regeneration
- Mana
- Mana Regeneration
- Attack Damage
- Attack Speed
- Armor
- Magic Resistance
- Movement Speed

Does **NOT** account for champion abilities/passives, only their base stats.


## Running Locally

- Install Node.js

### Backend
```
cd server
npm install

node index.js
```
- Runs on http://localhost:3001
- Endpoint example: /champion/Sona

### Frontend 

```
cd ../client
npm install

npm run dev
```

- Open http://localhost:5173

## Dependencies
## Frontend
- React
- Vite
- Axios
- Recharts
- TailwindCSS (optional)

## Backend
- Express
- Axios
- CORS
