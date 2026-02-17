# d:\rr\Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
RUN bun run build

# Expose the production port
EXPOSE 3000

# Start the React Router production server
CMD ["bun", "run", "start"]