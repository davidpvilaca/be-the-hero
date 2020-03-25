import * as express from 'express'
import {
  incidentController,
  ongController,
  profileController,
  sessionController,
  utilsController
} from './controllers'
const routes = express.Router()

/**
 * Utils routes
 */
routes.get('/ping', utilsController.ping)

/**
 * Session
 */
routes.post('/sessions', sessionController.create)

/**
 * ONGS
 */
routes.get('/ongs', ongController.list)
routes.post('/ongs', ongController.create)

/**
 * Incidents
 */
routes.get('/incidents', incidentController.list)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.deleteIncident)

/**
 * Profile
 */
routes.get('/profile', profileController.list)

export default routes
