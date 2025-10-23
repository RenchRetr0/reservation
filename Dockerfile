FROM node:22-alpine
RUN apk add --no-cache tzdata
ENV TZ=Europe/Moscow
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci --omit=dev --ignore-scripts=true --audit=false --fund=false

COPY ./dist .

CMD node ./main.js --enable-source-maps
