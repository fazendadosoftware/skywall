import { Env } from './types.d'
export interface GoogleDistanceMatrixResponseRow {
  elements: Array<{
    distance: { text: string, value: number }
    duration: { text: string, value: number }
  }>
}
export interface GoogleDistanceMatrixResponse {
  destination_addresses: string[]
  origin_addresses: string[]
  rows: GoogleDistanceMatrixResponseRow[]
  status: 'OK' | 'REQUEST_DENIED' | 'INVALID_REQUEST'
  error_message?: string
}

// https://developers.google.com/maps/documentation/distance-matrix/distance-matrix
export interface GetDistanceParams {
  destinations: Array<string | number>
  origins: Array<string | number>
  units?: 'imperial' | 'metric'
  mode?: 'driving' | 'walking' | 'bicycling' | 'transit'
  language?: 'pt-BR' | 'en'
}

const getDistance = async (params: GetDistanceParams, env: Env) => {
  if (!env.GOOGLE_MAPS_API_KEY) throw Error('Error: GOOGLE_MAPS_API_KEY is undefined')
  if (!params.units) params.units = 'metric'
  if (!params.mode) params.mode = 'driving'

  const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json')
  url.searchParams.set('key', env.GOOGLE_MAPS_API_KEY ?? '')
  Object.entries(params)
    .forEach(([key, value]) => {
      url.searchParams.set(key, Array.isArray(value) ? value.join(' ') : value)
    })
  const response = await fetch(url.toString())
  if (response.ok) {
    const data = await response.json() as GoogleDistanceMatrixResponse
    return data
  }
  return Promise.reject({ status: response.status, message: response.statusText })
}

export { getDistance }
