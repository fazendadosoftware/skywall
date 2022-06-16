/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { estimateCost } from './estimator'
import { Env } from './types.d'

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    console.log('ENV', env)
    const { searchParams } = new URL(request.url)
    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    if (origin === null) return new Response('invalid origin')
    if (destination === null) return new Response('invalid destination')
    const estimateCostResponse = await estimateCost(origin, destination, env)
    return new Response(JSON.stringify(estimateCostResponse, null, 2))
  }
}
