import { plus_one } from '../src/Main'
import { TestLambdaAPI } from '../lib/aws-lambda/LambdaAPI'

describe('Lambda', () => {
  test('plus_one', async () => {
    let result = await TestLambdaAPI<{ num: number }>('GET', { num: 1 }, plus_one)
    expect(result.num).toEqual(2)
  })
})
