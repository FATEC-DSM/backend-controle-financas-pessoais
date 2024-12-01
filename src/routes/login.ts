import express, { Router, Request, Response } from 'express'
import { AuthController } from '../controllers/auth-controller'
import { CredentialsInterface } from '../interfaces/CredentialInterface'

const router = Router()
router.use(express.json())

router.post('/', async (req: Request, res: Response) => {
  const credentials: CredentialsInterface = req.body

  const auth = new AuthController()
  auth.email = credentials.email
  auth.password = credentials.password

  const { ok, status, message, body } = await auth.handlePost()
  res.status(status).send({ ok, message, body })
})

export default router
