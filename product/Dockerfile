FROM node:20-alpine3.17

WORKDIR /app

COPY package.json /app/

RUN yarn

COPY src /app/src/


ENV NODE_ENV=PRODUCTION


EXPOSE 5000

CMD [ "yarn", "start" ]