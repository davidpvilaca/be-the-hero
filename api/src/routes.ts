import * as express from 'express'
import {
  incidentController,
  ongController,
  profileController,
  sessionController,
  utilsController
} from './controllers'
import { IncidentValidator, OngValidator, SessionValidator } from './validators'

const routes = express.Router()

/**
 * Utils routes
 */
routes.get('/ping', utilsController.ping)

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
