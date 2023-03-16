FROM node:14-alpine

WORKDIR /

ENV MONGO_URI=localhost:27017/ecommerce

COPY package.json package-lock.json* ./
COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]