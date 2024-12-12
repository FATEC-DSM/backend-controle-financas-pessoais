import express, { Router, Request, Response } from 'express'
import { UserController } from '../controllers/user-controller'
import { User } from '../interfaces/User'

const router = Router()
router.use(express.json())

router.post('/', async (req: Request, res: Response) => {
  const bodyUser: User = req.body

  try {
    const user = new UserController()
    user.email = bodyUser.email
    user.password = bodyUser.password
    user.name = bodyUser.name
    user.lastName = bodyUser.lastName

    const { ok, status, message, body } = await user.handlePost()

    res.status(status).send({ ok, message, body })
  } catch (error: any) {
    res.status(400).send(error.message)
  }
})

export default router
