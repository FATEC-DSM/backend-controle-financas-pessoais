import { usersRepository } from './../repositories/user-repository'
import { encrypt } from '../services/crypto'
import { ControllersResponse } from '../interfaces/ControllersResponse'

export class AuthController {
  private _email = ''
  private _pass = ''

  set email(value: string) {
    const isValid = this._validateEmail(value)
    if (!isValid) throw new Error('Email inválido')

    this._email = value
  }

  set password(value: string) {
    this._pass = encrypt(value)
  }

  async handlePost(): Promise<ControllersResponse> {
    const response = {
      ok: false,
      status: 400,
      message: '',
      body: {},
    }

    if (!this._email || !this._pass) {
      response.message = 'Preencha todos os campos.'
      return response
    }

    const results = await usersRepository.read({
      email: this._email,
      password: this._pass,
    })

    if (!results?.length) {
      response.message = 'Usuário não encontrado'
      return response
    }

    const user = { ...results[0], password: '' }

    response.ok = true
    response.status = 200
    response.body = user

    return response
  }

  _validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }
}
