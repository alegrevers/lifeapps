FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY src /app/src

CMD ["yarn", "start"]

# COPY ../wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh
# CMD ["./wait-for-it.sh", "rabbitmq:5672", "--", "npm", "start"]