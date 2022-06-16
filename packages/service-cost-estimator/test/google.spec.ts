import { getDistance, GetDistanceParams } from '../src/google'

test('validateCEP should reply with an address to a valid CEP', async () => {
  const params: GetDistanceParams = {
    origins: [70675105, 'Brasília'],
    destinations: [70675100, 'Brasília']
  }
  const res = await getDistance(params)
  console.log(res)
})
