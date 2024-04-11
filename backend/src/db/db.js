const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'host',
	user: 'username',
	password: 'pw',
	database: 'db_name',
});

connection.connect((error) => {
	if (error) throw error;
	console.log('Successfully connected to the database');
});

module.exports = connection;
