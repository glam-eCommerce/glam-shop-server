FROM node:16-alpine

WORKDIR /

COPY package.json package-lock.json* ./
COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]