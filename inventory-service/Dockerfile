FROM node:18

WORKDIR /app

COPY package.json .

COPY .env .env

RUN npm install

COPY src /app/src

CMD ["yarn", "start"]

EXPOSE 3001