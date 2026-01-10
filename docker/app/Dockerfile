FROM node:20-alpine AS base

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}" \
  APP_PORT=3000

WORKDIR /app

RUN apk add --no-cache libc6-compat && corepack enable

# --- Dependencies layer ---
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# --- Build layer ---
FROM deps AS builder
COPY . .
RUN pnpm run build

# --- Production image ---
FROM node:20-alpine AS runner
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}" \
  NODE_ENV=production \
  APP_PORT=3000

WORKDIR /app

# Copy standalone output produced by Next.js build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]

