# binance_triangular_arbitrage_backend
You need to set binance api key, secret key in .env file.
Socket port: 2053
Server port: 3000
## Build
```bash
npm install
sequelize db:migrate --env=production
sequelize db:seed:all --env=production
node start
```

## PM2 command
```bash
pm2 start --name backend npm -- start
```