import { errors } from 'celebrate'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import { NotFound } from 'http-errors'
import routes from './routes'

const app = express()

/**
 * Configurações de segurança
 */
app.use(helmet())
app.use(
  cors({
    optionsSuccessStatus: 204,
    origin: [/http(s|):\/\/(.+\.|)localhost(:[0-9]+|)(\/|)$/]
  })
)

/**
 * Middlewares essenciais
 */
app.use(express.json())

/**
 * Application middlewares
 */
app.use(routes)

/**
 * Error handlers
 */
app.use(errors())
app.use(
  (_: express.Request, __: express.Response, next: express.NextFunction) => {
    next(new NotFound())
  }
)
app.use(
  (
    err: any,
    _: express.Request,
    res: express.Response,
    __: express.NextFunction
  ) => res.status(err.statusCode || 500).json(err)
)

export default app
