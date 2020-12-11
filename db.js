const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
	user: "postgres",
	password: process.env.DB_PASS,
	database: "todo_database",
	host: "localhost",
	port: 5432,
})

module.exports = pool
