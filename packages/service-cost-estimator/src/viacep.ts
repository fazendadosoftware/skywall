import Axios, { AxiosResponse } from 'axios'

export interface ViaCepResponse {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}

const validateCEP = async (cep: number): Promise<ViaCepResponse | null> => {
  try {
    const res: AxiosResponse<ViaCepResponse> = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return res.data
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) return null
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    throw error
  }
}

export { validateCEP }