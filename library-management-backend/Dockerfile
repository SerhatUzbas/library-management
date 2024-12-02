FROM node:18-alpine

WORKDIR /app

COPY package.json ./

# Add necessary dependencies for Prisma
RUN apk add --no-cache openssl

# Add build dependencies for Prisma
RUN apk add --no-cache --virtual builds-deps build-base python3

RUN yarn install

COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/

# Generate Prisma client with correct binary
ENV PRISMA_BINARY_PLATFORM=linux-musl
RUN yarn prisma generate

RUN yarn build

EXPOSE 8000

CMD ["yarn", "dev"]
