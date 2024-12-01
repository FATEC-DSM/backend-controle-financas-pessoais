import mysql from 'mysql2/promise'
import 'dotenv/config'

class Database {
  private _pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'personalmoney',
    waitForConnections: true, // Espera pela conexão caso todas estejam ocupadas
    connectionLimit: 10, // Número máximo de conexões no pool
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  })

  get pool() {
    return this._pool
  }
}

export const DB = new Database()
