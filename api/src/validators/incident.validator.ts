import * as Joi from '@hapi/joi'
import { celebrate, Segments } from 'celebrate'

const list = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer()
  })
})

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number()
      .positive()
      .required()
  })
})

const deleteIncident = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
})

export default { list, create, deleteIncident }
