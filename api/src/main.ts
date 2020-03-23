import { json as bodyParserJson } from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(
  cors({
    optionsSuccessStatus: 204,
    origin: [/http(s|):\/\/(.+\.|)localhost(:[0-9]+|)(\/|)$/]
  })
)
app.use(bodyParserJson())

app.get('/ping', (_, res) => res.json('Pong!'))

export default app
