require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

class Config {
  readonly NODE_ENV: string = Config.dotenv('NODE_ENV')

  // readonly AWSC_ACCESS_KEY_ID: string = Config.dotenv('AWSC_ACCESS_KEY_ID')
  // readonly AWSC_SECRET_ACCESS_KEY: string = Config.dotenv('AWSC_SECRET_ACCESS_KEY')
  readonly AWSC_REGION: string = Config.dotenv('AWSC_REGION')

  readonly DB_SAMPLE: string = Config.aws_resource('DB_SAMPLE')

  // project-develop-resource
  private static aws_resource(resource: string): string {
    return `${Config.dotenv('SERVICE')}-${Config.dotenv('NODE_ENV')}-${Config.dotenv(resource)}`
  }

  private static dotenv(env: string): string {
    const envvar = process.env[env]
    if (envvar == null || envvar === '') {
      console.error(`[Config.${env}] Not set in .env`)
      throw new Error(`[Config.${env}] Not set in .env`)
    }
    return envvar
  }
}

const Cfg = new Config()
if (Cfg.NODE_ENV === 'development') {
  // console.log(Cfg)
}

export default Cfg
