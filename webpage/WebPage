FROM node:16.13.2

WORKDIR /app

COPY ./webpage/package.json .
COPY ./webpage/package-lock.json .
RUN npm install --production

COPY . .

EXPOSE 3003

CMD [ "node", "./webpage/server.js"]