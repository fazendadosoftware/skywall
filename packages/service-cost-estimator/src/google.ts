import { Client } from '@googlemaps/google-maps-services-js'

let client: null | Client = null

const init = () =>  new Client()

const process = () => {
  if (client === null) client = init()
  client.distancematrix({
    params: {
      origins: [],
      destinations: [''],
      units: 
    }
  })
}