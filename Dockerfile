# Stage 1: Builder
FROM node:18-alpine AS builder

ARG GH_USERNAME
ARG GH_API_TOKEN

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build Next.js application
RUN npm run build


# Stage 2: Runner
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV production

# Set application port
ENV PORT 3000

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
USER appuser

# Copy build artifacts and dependencies
COPY --from=builder --chown=appuser:appgroup /app/.next ./.next
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/package.json ./package.json
COPY --from=builder --chown=appuser:appgroup /app/next.config.ts ./next.config.ts

# Expose application port
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
