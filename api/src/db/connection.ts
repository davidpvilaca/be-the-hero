import * as knex from 'knex'
import { environments } from '../config'
import * as knexfile from '../knexfile'

const configKnex = environments.isTest ? knexfile.test : knexfile.development

const connection = knex(configKnex)

export default connection
