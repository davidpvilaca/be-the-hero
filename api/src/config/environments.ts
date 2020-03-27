import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const getEnv = (name: string, defaultValue: string) =>
  process.env[name] || defaultValue

const NODE_ENV = getEnv('NODE_ENV', 'development') as
  | 'test'
  | 'development'
  | 'staging'
  | 'production'

export default {
  NODE_ENV,
  isDev: NODE_ENV !== 'production',
  isProd: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
  PORT: parseInt(getEnv('PORT', '3333'), 10),
  timezone: getEnv('TIMEZONE', 'America/Sao_Paulo')
}
