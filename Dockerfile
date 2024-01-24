# 첫 번째 단계: 의존성 설치 및 빌드
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# 두 번째 단계: 실행을 위한 최소한의 파일만 포함
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm ci --only=production

EXPOSE 8080

CMD [ "npm", "run", "preview" ]