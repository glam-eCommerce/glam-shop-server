## Backend server setup

Install dependencies

```shell
npm install
```

## Environment variables

Create an environment variable `.env` in the root folder with the following details

For on-premise testing database please enter the followig for DATABASE variable

`DATABASE=mongodb://localhost:27017/ecommerce`

Full .env file config

```shell
DATABASE=<insert mongodb connection string>
PORT=8000
BRAINTREE_MERCHANT_ID=<insert braintree merchant id>
BRAINTREE_PUBLIC_KEY=<insert braintree public key>
BRAINTREE_PRIVATE_KEY=<insert braintree private key>
```

## Start backend server

To start the express server, run the following

```shell
npm start
```

Open [http://localhost:8000](http://localhost:3000/)
