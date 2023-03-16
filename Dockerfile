FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY . .

RUN npm install

# Set environment variable
ENV DATABASE=mongodb://host.docker.internal:27017
ENV PORT=8000
ENV BRAINTREE_MERCHANT_ID=3wv8zr3vrx5y2h8b
ENV BRAINTREE_PUBLIC_KEY=sd25mjxk4hhw9t7r
ENV BRAINTREE_PRIVATE_KEY=a5df57ceeb3919851d4cd2f8c51db3a5

EXPOSE 8000

CMD ["npm", "start"]