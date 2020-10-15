require('dotenv').config()
console.log(process.env.POSTGRES_HOST)
module.exports = {
  "type": "postgres",
  "host": process.env.POSTGRES_HOST,
  "port": 5432,
  "username": process.env.POSTGRES_USERNAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DATABASE,
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
