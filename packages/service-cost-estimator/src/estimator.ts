import { validateCEP, ViaCepResponse } from './viacep'
import { getDistance } from './google'
import { Env } from './types.d'

export interface EstimateCostResponse {
  origin: ViaCepResponse
  destination: ViaCepResponse
  distance: { text: string, value: number }
  duration: { text: string, value: number }
  units: 'metric' | 'imperial'
}

const fields: Array<keyof ViaCepResponse> = ['logradouro', 'cep', 'localidade', 'uf']
const estimateCost = async (originCep: number | string, destinationCep: number | string, env: Env) => {
  const units = 'metric'
  const validatedCeps = await Promise.all([originCep, destinationCep].map(validateCEP))
  const invalidCeps = validatedCeps.filter(cep => cep === null).length > 0
  if (invalidCeps) throw Error('invalid ceps')
  const [origins, destinations] = validatedCeps
    .map(cep => fields.map(key => (cep as ViaCepResponse)[key]))
  const distanceResponse = await getDistance({ origins, destinations, units }, env)
  if (distanceResponse.status === 'OK') {
    const { distance, duration } = distanceResponse.rows?.[0].elements?.[0]
    const response: EstimateCostResponse = {
       origin: validatedCeps[0] as ViaCepResponse,
       destination: validatedCeps[1] as ViaCepResponse,
       distance,
       duration,
       units
    }
    return response
  } else {
    throw Error('could not estimate distance')
  }
}

export { estimateCost }
