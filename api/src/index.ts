import { environments } from './config'
import app from './main'

app.listen(environments.PORT, () =>
  console.log(`Application started on port ${environments.PORT}`)
)
