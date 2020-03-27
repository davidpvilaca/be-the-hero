import * as express from 'express'
import {
  generalController,
  incidentController,
  ongController,
  profileController,
  sessionController
} from './controllers'
import { IncidentValidator, OngValidator, SessionValidator } from './validators'

const routes = express.Router()

/**
 * General routes
 */
routes.get('/ping', generalController.ping)
routes.get('/500', generalController.e500)

/**
 * Session
 */
routes.post('/sessions', SessionValidator.create, sessionController.create)

/**
 * ONGS
 */
routes.get('/ongs', ongController.list)
routes.post('/ongs', OngValidator.create, ongController.create)

/**
 * Incidents
 */
routes.get('/incidents', IncidentValidator.list, incidentController.list)
routes.post('/incidents', IncidentValidator.create, incidentController.create)
routes.delete(
  '/incidents/:id',
  IncidentValidator.deleteIncident,
  incidentController.deleteIncident
)

/**
 * Profile
 */
routes.get('/profile', profileController.list)

export default routes
