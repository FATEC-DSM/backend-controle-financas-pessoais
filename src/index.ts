import express, { Request, Response, Application } from 'express'
import login from './routes/login'
import createUser from './routes/create-user'
import cors from 'cors'
import { sessionInit } from './session'
import 'dotenv/config'

const app: Application = express()
const port = process.env.PORT || 8080

sessionInit(app)

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use((req, res, next) => {
  console.log(req.session)
  next()
})

app.use('/login', login)
app.use('/create-user', createUser)

app.get('/', (req: Request, res: Response) => {
  res.send('Bem vindo ao seu controle de finanças')
})

app.listen(port, () => {
  console.log(`Servidor está online na porta http://localhost:${port}`)
})
