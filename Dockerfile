# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy application files
COPY . .

# Build Next.js application
RUN npm run build


# Stage 2: Runner
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy build artifacts and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose application port
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
