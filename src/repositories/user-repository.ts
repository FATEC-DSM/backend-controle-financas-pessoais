import { DB } from '../connection'
import { CredentialsInterface } from '../interfaces/CredentialInterface'
import { User } from '../interfaces/User'
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
  private table = 'Users'

  async create(entity: User) {
    try {
      const [results, fields] = await DB.pool.execute(
        `INSERT INTO ${this.table} (Email, Password, Name, Last_name) VALUES (?, ?, ?, ?)`,
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
        `SELECT Id_user, Email, Name, Last_name FROM ${this.table} WHERE email = ? AND password = ?`,
        [entity.email, entity.password]
      )

      return results as User[]
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const usersRepository = new UsersRepository()
