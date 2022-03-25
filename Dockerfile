FROM node:16.13.2

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY . .

CMD [ "node", "bot.js"]