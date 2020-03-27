import * as knex from 'knex'
import { environments } from '../config'
import * as knexfile from '../knexfile'

const connection = knex(knexfile[environments.NODE_ENV])

export default connection
