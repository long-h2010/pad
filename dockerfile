from node:18-alpine
workdir /app
copy *.json ./
copy apps/backend/package.json ./apps/backend/package.json
copy apps/frontend/package.json ./apps/frontend/package.json
run npm install
copy . .
cmd ["npm", "run", "dev"]