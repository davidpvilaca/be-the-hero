import { celebrate, Joi, Segments } from 'celebrate'

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    whatsapp: Joi.string()
      .required()
      .regex(/^[0-9]{2}[0-9]{8,9}$/),
    city: Joi.string().required(),
    uf: Joi.string()
      .required()
      .length(2)
  })
})

export default { create }
