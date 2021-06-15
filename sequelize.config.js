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
		username: 'arbit',
		password: 'o=^4kn:C+6HX',
		database: 'arbitrage_db',
		host: '127.0.0.1',
		port: 3306,
		dialect: 'mysql',
		dialectOptions: { decimalNumbers: true },
		logging: false,
	},
};
