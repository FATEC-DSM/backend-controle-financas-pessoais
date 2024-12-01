import { DB } from '../connection'
import { CredentialsInterface } from '../interfaces/CredentialInterface'
import { User } from '../interfaces/repositories/User'
import { Repository } from './../interfaces/Repository.d'

type ResultSetHeader = {
  fieldCount: Number
  affectedRows: Number
  insertId: Number
  info: String
  serverStatus: Number
  warningStatus: Number
  changedRows: Number
}

class UsersRepository implements Repository<User> {
  private table = 'users'

  async create(entity: User) {
    try {
      const [results, fields] = await DB.pool.execute(
        `INSERT INTO ${this.table} (email, password, name, last_name) VALUES (?, ?, ?, ?)`,
        [entity.email, entity.password, entity.name, entity.lastName]
      )

      const res = results as ResultSetHeader

      return res.affectedRows == 1
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async read(entity: CredentialsInterface) {
    try {
      const [results, fields] = await DB.pool.execute(
        `SELECT * FROM ${this.table} WHERE email = ? AND password = ?`,
        [entity.email, entity.password]
      )

      return results as User[]
    } catch (error) {
      console.log(error)
    }
  }
}

export const usersRepository = new UsersRepository()
