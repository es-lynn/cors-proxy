require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

export const Cfg = new (class {
  readonly NODE_ENV: string = dotenv('NODE_ENV')
})()

function dotenv(env: string): string {
  const envvar = process.env[env]
  if (envvar == null || envvar === '') {
    console.error(`[Config.${env}] Not set in .env`)
    throw new Error(`[Config.${env}] Not set in .env`)
  }
  return envvar
}
