import Cfg from './Config'
import { AwsDynamodb } from '../../lib/aws-dynamodb/AwsDynamodb'
import { Sample } from '../db/model/Sample.type'

export const DB = new AwsDynamodb<Sample>(Cfg.AWSC_REGION, Cfg.DB_SAMPLE)
