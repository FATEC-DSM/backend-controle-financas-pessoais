import express, { Router, Request, Response } from 'express'
import { TransactionController } from '../controllers/transaction-controller'
import { TransactionInterface } from '../interfaces/TransactionInterface'

const router = Router()
router.use(express.json())

const transactionController = new TransactionController()

router.post('/', async (req: Request, res: Response) => {
  const transaction: TransactionInterface = req.body

  transactionController.userId = transaction.userId
  transactionController.categoryId = transaction.categoryId
  transactionController.type = transaction.type
  transactionController.amount = Number(transaction.amount)
  transactionController.date = transaction.date
  transactionController.description = transaction.description

  const { ok, status, message, body } = await transactionController.handlePost()
  res.status(status).send({ ok, message, body })
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { ok, status, message, body } =
    await transactionController.handleDelete(req.params.id)

  res.status(status).send({ ok, message, body })
})

router.get('/:userId', async (req: Request, res: Response) => {
  transactionController.minDate = String(req.query.minDate)
  transactionController.maxDate = String(req.query.maxDate)

  const { ok, status, message, body } = await transactionController.handleGet({
    userId: req.params.userId,
    categoryId: req.query.categoryId as string,
    type: req.query.type as string,
  })

  res.status(status).send({ ok, message, body })
})

export default router
