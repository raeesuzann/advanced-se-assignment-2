# --- Stage 1: Build Stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# 3. Copy the rest and build
COPY . .
RUN npm run build

# --- Stage 2: Production Stage ---
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]