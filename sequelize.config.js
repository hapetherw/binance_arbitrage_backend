module.exports = {
	development: {
		username: 'root',
		password: '',
		database: 'arbitrage_db',
		host: '127.0.0.1',
		port: 3306,
		dialect: 'mysql',
		dialectOptions: { decimalNumbers: true },
		logging: true,
	},
	production: {
		username: 'bet75',
		password: '77CPGoy_$6C=',
		database: 'arbitrage_db',
		host: '127.0.0.1',
		port: 3306,
		dialect: 'mysql',
		dialectOptions: { decimalNumbers: true },
		logging: false,
	},
};
