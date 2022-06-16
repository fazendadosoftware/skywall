import { estimateCost } from '../src/estimator'
import { Env } from '../src/types.d'

const env: Env = { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY ?? '' }
test('we can estimate the cost from two CEPs', async () => {
  const origin = 70675105
  const destination = '04455360'
  const res = await estimateCost(origin, destination, env)
  console.log(res)
})
