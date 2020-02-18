import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { NotImplementedError } from '@aelesia/commons/dist/src/misc/Errors'

type APIGatewayHandler = (event: APIGatewayProxyEvent, _context: Context) => Promise<APIGatewayProxyResult>

export function LambdaAPI(func: (data: any) => object): APIGatewayHandler {
  return async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    try {
      let body = content(event)
      let result = await func(body)
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      }
    } catch (e) {
      console.error(e)
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: { name: e.name, message: e.message }
        })
      }
    }
  }
}

export async function TestLambdaAPI<T>(method: string, data: object, handler: APIGatewayHandler): Promise<T> {
  let a = (
    await handler(
      {
        body: JSON.stringify(data),
        httpMethod: method,
        queryStringParameters: data
      } as any,
      {} as any
    )
  ).body
  return JSON.parse(a)
}

function content(event: APIGatewayProxyEvent): object {
  switch (event.httpMethod) {
    case 'GET':
      return event.queryStringParameters ?? {}
    case 'POST':
      return JSON.parse(event.body ?? '{}')
    default:
      throw new NotImplementedError()
  }
}
