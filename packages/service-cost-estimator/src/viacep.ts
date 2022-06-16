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
    const response:Response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if (response.ok) {
      const data = await response.json() as ViaCepResponse
      return data
    } else if (response.status === 400) return null
    else throw Error(JSON.stringify({ status: response.status, message: response.statusText }))
  } catch (error: any) {
    // probably there is a network error
    throw error
  }
}

export { validateCEP }