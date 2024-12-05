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
  transactionController.amount = transaction.amount
  transactionController.date = transaction.date
  transactionController.description = transaction.description

  const { ok, status, message, body } = await transactionController.handlePost()
  res.status(status).send({ ok, message, body })
})

router.get('/:userId', async (req: Request, res: Response) => {
  transactionController.minDate = String(req.query.minDate)
  transactionController.maxDate = String(req.query.minDate)

  const { ok, status, message, body } = await transactionController.handleGet({
    userId: req.params.userId,
    categoryId: String(req.query.categoryId),
    type: String(req.query.type),
  })

  res.status(status).send({ ok, message, body })
})

export default router
