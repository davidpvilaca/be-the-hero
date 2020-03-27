import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const getEnv = (name: string, defaultValue = '') =>
  process.env[name] || defaultValue

const NODE_ENV = getEnv('NODE_ENV', 'development')
export default {
  isDev: NODE_ENV !== 'production',
  isProd: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
  PORT: parseInt(getEnv('PORT', '3333'), 10),
  timezone: getEnv('TIMEZONE', 'America/Sao_Paulo')
}
