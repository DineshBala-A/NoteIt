# syntax=docker/dockerfile:1

FROM node:20.10.0-alpine

ENV NODE_ENV development

WORKDIR /app

# Only install deps initially (source code will be mounted later)
COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm install

# Vite's default port
EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]
