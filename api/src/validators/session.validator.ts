import * as Joi from '@hapi/joi'
import { celebrate, Segments } from 'celebrate'

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
})

export default { create }
