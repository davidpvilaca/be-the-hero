const development = {
  client: 'sqlite3',
  connection: {
    filename: './src/db/db.sqlite'
  },
  migrations: {
    directory: './src/db/migrations'
  },
  useNullAsDefault: true
}

const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

export { development, staging, production }
