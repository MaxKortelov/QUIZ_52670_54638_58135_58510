const path = require("path");
const sqlMigrations = require("sql-migrations");
require("dotenv").config();

const configuration = {
  migrationsDir: path.resolve(__dirname, './migrations'),
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  adapter: 'pg',
  minMigrationTime: new Date('2024-01-01').getTime()
};

sqlMigrations.run(configuration);