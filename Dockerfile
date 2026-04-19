# --- Stage 1: Build Stage ---
FROM node:22-alpine AS build
WORKDIR /app

# 1. Copy Yarn files specifically
COPY package.json yarn.lock ./

# 2. Use yarn install with --frozen-lockfile (the Yarn version of 'npm ci')
RUN yarn install --frozen-lockfile

# 3. Copy the rest and build
COPY . .
RUN yarn build

# --- Stage 2: Production Stage ---
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]