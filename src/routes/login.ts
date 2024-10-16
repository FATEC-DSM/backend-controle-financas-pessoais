import express, { Router, Request, Response } from 'express'

const router = Router()
router.use(express.json())

router.post('/', (req: Request, res: Response) => {
  const { email, password } = req.body
  res.send(JSON.stringify(req.body))
})

export default router
