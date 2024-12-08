import express, { Router, Request, Response } from 'express'
import { CategoryController } from '../controllers/category-controller'
import { CategoryInterface } from '../interfaces/Category'

const router = Router()
router.use(express.json())

const categoryController = new CategoryController()

router.post('/', async (req: Request, res: Response) => {
  const category: CategoryInterface = req.body

  categoryController.userId = category.userId as string
  categoryController.name = category.name
  categoryController.description = category.description

  const { ok, status, message, body } = await categoryController.handlePost()
  res.status(status).send({ ok, message, body })
})

router.get('/:userId', async (req: Request, res: Response) => {
  const { ok, status, message, body } = await categoryController.handleGet({
    userId: req.params.userId,
  })

  res.status(status).send({ ok, message, body })
})

export default router
