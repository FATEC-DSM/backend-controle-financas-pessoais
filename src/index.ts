import express, { Request, Response, Application } from 'express'
import login from './routes/login'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
)
app.use('/auth', login)

app.get('/', (req: Request, res: Response) => {
  res.send('Bem vindo ao seu controle de finanças')
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
