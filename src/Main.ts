import { LambdaAPI } from '../lib/aws-lambda/LambdaAPI'
import { Sample } from './db/model/Sample.type'
import { DB } from './app/Spring'

export const insert = LambdaAPI(
  async (data: Sample): Promise<Sample> => {
    await DB.insert(data.id, data)
    return data
  }
)

export const select = LambdaAPI(
  async (data: { id: string }): Promise<Sample> => {
    return await DB.select(data.id)
  }
)

export const scan = LambdaAPI(
  async (): Promise<Sample[]> => {
    return await DB.scan()
  }
)

export const update = LambdaAPI(
  async (data: Sample): Promise<Sample> => {
    return await DB.update(data.id, data)
  }
)

export const del = LambdaAPI(
  async (data: { id: string }): Promise<{}> => {
    await DB.delete(data.id)
    return {}
  }
)

export const plus_one = LambdaAPI(
  async (data: { num: number }): Promise<{ num: number }> => {
    return { num: ++data.num }
  }
)

export const hello_world = LambdaAPI(
  async (): Promise<{ message: string }> => {
    return { message: 'Hello World' }
  }
)
