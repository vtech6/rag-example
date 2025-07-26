#Dev stage
FROM node:23-alpine AS dev

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run" "nodemon"]

#Build stage
FROM node:23-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:23-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

# Run migration then start app
CMD sh -c "npx --yes @better-auth/cli migrate --config /app/dist/utils/auth.js --y && node dist/index.js"
