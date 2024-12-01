import { usersRepository } from './../repositories/user-repository'
import { encrypt } from '../services/crypto'
import { ControllersResponse } from '../interfaces/ControllersResponse'

export class UserController {
  private _email = ''
  private _pass = ''
  private _name = ''
  private _lastName = ''

  set email(value: string) {
    const isValid = this._validateEmail(value)
    if (!isValid) throw new Error('Email inválido')

    this._email = value
  }

  set password(value: string) {
    this._pass = encrypt(value)
  }

  set name(value: string) {
    this._name = value
  }

  set lastName(value: string) {
    this._lastName = value
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

    const criado = await usersRepository.create({
      email: this._email,
      password: this._pass,
      name: this._name,
      lastName: this._lastName,
    })

    if (!criado) {
      response.message = 'Falha ao cadastrar o usuário'
      return response
    }

    response.ok = true
    response.status = 201
    response.body = {}
    response.message = 'Usuário cadastrado'

    return response
  }

  _emptyFieldsValidate() {
    return !this._email || !this._pass || !this._name || !this._lastName
  }

  _validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }
}
