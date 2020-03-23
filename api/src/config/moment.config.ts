import * as moment from 'moment-timezone'
import environments from './environments'

const { timezone } = environments

moment.tz.setDefault(timezone)
