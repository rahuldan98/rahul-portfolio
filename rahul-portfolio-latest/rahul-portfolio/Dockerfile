# ---------- Stage 1: build the static site ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Uses the lockfile if present (reproducible); falls back to npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm run build

# ---------- Stage 2: serve with nginx ----------
FROM nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Run as the unprivileged "nginx" user (uid 101). Non-root can't bind port 80,
# so nginx listens on 8080; the Kubernetes Service maps 80 -> 8080.
USER nginx
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
