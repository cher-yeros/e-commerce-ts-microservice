FROM node:20-alpine3.17

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY src /app/src/
COPY tsconfig.json /app/
COPY .env /app/

ENV NODE_ENV=PRODUCTION

EXPOSE 5000

CMD [ "yarn", "start" ]