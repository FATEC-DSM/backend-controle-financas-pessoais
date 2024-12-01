import { User } from '../interfaces/User'
import { usersRepository } from '../repositories/user-repository'
import { encrypt } from '../services/crypto'

export class RegisterUser {
  async handlePost(user: User) {
    if (!this.email || !this.password) {
      throw new Error()
    }

    try {
      await usersRepository.create(user)
    } catch (error) {
      throw new Error(error)
    }
  }

  set email(value: string) {
    const isValid = this._validateEmail(value)
    if (!isValid) throw new Error('Email inválido')

    this.email = value
  }

  set password(value: string) {
    this.password = encrypt(value)
  }

  _validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }
}
