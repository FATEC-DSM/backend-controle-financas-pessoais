import { DB } from '../connection'
import { TransactionInterface } from '../interfaces/TransactionInterface'
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

type TransactionRangeDate = {
  minDate?: Date
  maxDate?: Date
}

class TransactionRepository implements Repository<TransactionInterface> {
  private table = 'Transactions'

  async create(entity: TransactionInterface) {
    try {
      const [results, fields] = await DB.pool.execute(
        `INSERT INTO ${this.table} (
          Id_user
          Id_category
          Type
          Amount
          Transaction_date
          Description
          ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          entity.userId,
          entity.categoryId,
          entity.type,
          entity.amount,
          entity.date,
          entity.description,
        ]
      )

      const res = results as ResultSetHeader

      return res.affectedRows == 1
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async read(query: TransactionRangeDate & Partial<TransactionInterface>) {
    try {
      if (query.type) {
        const [results, fields] = await this._readByType(
          query.userId!,
          query.type
        )
        return results as TransactionInterface[]
      } else if (query.categoryId) {
        const [results, fields] = await this._readByCategory(
          query.userId!,
          query.categoryId
        )
        return results as TransactionInterface[]
      } else if (query.minDate || query.maxDate) {
        const [results, fields] = await this._readByDateRange(
          query.userId!,
          query.minDate!,
          query.maxDate!
        )
        return results as TransactionInterface[]
      } else {
        const [results, fields] = await this._readByUser(query.userId!)
        return results as TransactionInterface[]
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async _readByUser(userId: string) {
    return await DB.pool.execute(
      `
      SELECT
        Id_category, Type, Amount, Transaction_date, Description
      FROM ${this.table} WHERE Id_user = ?
    `,
      [userId]
    )
  }

  async _readByType(userId: string, type: string) {
    return await DB.pool.execute(
      `
      SELECT
        Id_category, Type, Amount, Transaction_date, Description
      FROM ${this.table} WHERE Id_user = ? AND Type = ?
    `,
      [userId, type]
    )
  }

  async _readByCategory(userId: string, category: string) {
    return await DB.pool.execute(
      `
      SELECT
        Id_category, Type, Amount, Transaction_date, Description
      FROM ${this.table} WHERE Id_user = ? AND Id_category = ?
    `,
      [userId, category]
    )
  }

  async _readByDateRange(userId: string, minDate: Date, maxDate: Date) {
    return await DB.pool.execute(
      `
      SELECT
        Id_category, Type, Amount, Transaction_date, Description
      FROM ${this.table} WHERE Id_user = ? AND (Transaction_date >= ? AND Transaction_date <= ?)
    `,
      [userId, minDate, maxDate]
    )
  }
}

export const transactionRepository = new TransactionRepository()
