import { DB } from '../connection'
import { CategoryInterface } from '../interfaces/Category'
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

class CategoriesRepository implements Repository<CategoryInterface> {
  private table = 'Category'

  async create(entity: CategoryInterface) {
    try {
      const [results, fields] = await DB.pool.execute(
        `INSERT INTO ${this.table} (Id_user, Name, Description) VALUES (?, ?, ?)`,
        [entity.userId, entity.name, entity.description]
      )

      const res = results as ResultSetHeader

      return res.affectedRows == 1
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async read(entity: Partial<CategoryInterface>) {
    try {
      const [results, fields] = await DB.pool.execute(
        `SELECT Id_category, Id_user, Name, Description
          FROM ${this.table} WHERE Id_user = ?`,
        [entity.userId]
      )

      return results as CategoryInterface[]
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const categoriesRepository = new CategoriesRepository()
