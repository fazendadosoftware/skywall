import { validateCEP } from '../src/viacep'

test('validateCEP should reply with an address to a valid CEP', async () => {
  const response = await validateCEP(70675100)
  expect(response?.logradouro).toBe('QRSW 1')
  expect(response?.bairro).toBe('Setor Sudoeste')
  expect(response?.localidade).toBe('Brasília')
  expect(response?.uf).toBe('DF')
})

test('validateCEP should reply with a null to an invalid CEP', async () => {
  const response = await validateCEP(0)
  expect(response).toBe(null)
})
