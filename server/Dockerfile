FROM node:20.15.0-alpine

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app
COPY . ./app

RUN npm install

CMD ["npm", "start"]