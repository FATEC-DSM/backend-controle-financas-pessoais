import { CategoryInterface } from '../interfaces/Category'
import { ControllersResponse } from '../interfaces/ControllersResponse'
import { categoriesRepository } from '../repositories/category-repository'

export class CategoryController {
  userId = ''
  name = ''
  description = ''

  async handleGet(
    query: Partial<CategoryInterface>
  ): Promise<ControllersResponse> {
    const response = {
      ok: false,
      status: 400,
      message: '',
      body: {},
    }

    const results = await categoriesRepository.read({
      userId: query.userId,
    })

    if (!results.length) {
      response.message = 'Nenhuma categoria encontrada'
      response.body = { categories: [] }
    }

    response.ok = true
    response.status = 200
    response.body = { categories: results }

    return response
  }

  async handlePost(): Promise<ControllersResponse> {
    const response = {
      ok: false,
      status: 400,
      message: '',
      body: {},
    }

    if (!this._emptyFieldsValidate()) {
      response.message = 'Preencha todos os campos.'
      return response
    }

    const criado = await categoriesRepository.create({
      userId: String(this.userId),
      name: this.name,
      description: this.description,
    })

    if (!criado) {
      response.message = 'Falha ao cadastrar a categoria'
      return response
    }

    response.ok = true
    response.status = 201
    response.body = {}
    response.message = 'Categoria cadastrada'

    return response
  }

  _emptyFieldsValidate() {
    return !this.userId || !this.name || !this.description
  }
}
