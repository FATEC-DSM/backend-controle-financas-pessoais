import { query } from 'express'
import { ControllersResponse } from '../interfaces/ControllersResponse'
import { transactionRepository } from '../repositories/transaction-repository'
import { TransactionInterface } from './../interfaces/TransactionInterface.d'

export class TransactionController implements TransactionInterface {
  userId: string = ''
  categoryId: string = ''
  type: string = ''
  amount: Number = 0
  date: string = ''
  _minDate: Date = new Date(0)
  _maxDate: Date = new Date()
  description: string = ''

  set minDate(value: string) {
    if (isNaN(new Date(value).getTime())) {
      throw new Error('data mínima inválida')
    }

    this._minDate = new Date(value)
  }
  set maxDate(value: string) {
    if (isNaN(new Date(value).getTime())) {
      throw new Error('data máxima inválida')
    }

    this._maxDate = new Date(value)
  }

  async handleGet(
    query: Partial<TransactionInterface>
  ): Promise<ControllersResponse> {
    const response = {
      ok: false,
      status: 400,
      message: '',
      body: {},
    }

    const results = await transactionRepository.read({
      minDate: this._minDate,
      maxDate: this._maxDate,
      ...query,
    })

    if (!results.length) {
      response.message = 'Não foi encontrada nenhuma transação'
      response.body = { transactions: [] }
      return response
    }

    response.ok = true
    response.status = 200
    response.body = { transactions: results }

    return response
  }

  async handlePost(): Promise<ControllersResponse> {
    const response = {
      ok: false,
      status: 400,
      message: '',
      body: {},
    }

    if (this._emptyFieldsValidate()) {
      response.message = 'Preencha todos os campos.'
      return response
    }

    const created = await transactionRepository.create({
      userId: this.userId,
      categoryId: this.categoryId,
      type: this.type,
      amount: this.amount,
      date: this.date,
      description: this.description,
    })

    if (!created) {
      response.message = 'Falha ao criar a transação'
      return response
    }

    response.ok = true
    response.status = 201
    response.body = created

    return response
  }

  async handleDelete(id: string): Promise<ControllersResponse> {
    const response = {
      ok: false,
      status: 400,
      message: '',
      body: {},
    }

    const deleted = await transactionRepository.delete(id)

    if (!deleted) {
      response.message = 'Falha ao criar a transação'
      return response
    }

    response.ok = true
    response.status = 200

    return response
  }

  _emptyFieldsValidate() {
    return (
      !this.userId ||
      !this.categoryId ||
      !this.type ||
      !this.amount ||
      !this.date ||
      !this.description
    )
  }
}
