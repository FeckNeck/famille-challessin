FROM node:20 as base

RUN npx -y playwright install --with-deps chromium

#RUN apk --no-cache add curl
RUN corepack enable

# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm install --prod
#RUN npx playwright install
#RUN npx playwright install-deps

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build --ignore-ts-errors
# RUN node ace build:packages

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
# COPY --from=build /app/build/packages.json /app/build/packages.json
# RUN mkdir /app/tmp
EXPOSE 8080
CMD ["node", "./bin/server.js"]
