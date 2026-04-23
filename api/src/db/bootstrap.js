import mysql from 'mysql2/promise'

export const ensureDatabaseExists = async () => {
  const host = process.env.DB_HOST || 'localhost'
  const port = Number(process.env.DB_PORT || 3306)
  const user = process.env.DB_USER || 'root'
  const password = process.env.DB_PASSWORD || ''
  const database = process.env.DB_NAME || 'autoservice'

  const connection = await mysql.createConnection({ host, port, user, password })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``)
  await connection.end()
}
