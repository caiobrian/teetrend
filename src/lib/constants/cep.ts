export const CEP_LENGTH = 8
export const CLEAN_CEP_REGEX = /\D/g
export const FORMAT_CEP_REGEX = /^(\d{5})(\d{0,3})/
export const CEP_ERROR_MESSAGES = {
  INVALID_LENGTH: 'Digite um CEP válido.',
  FETCH_ERROR: 'Erro ao buscar o CEP',
  NOT_FOUND: 'CEP não encontrado.',
  TIMEOUT: 'Tempo limite excedido. Tente novamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
} as const
export const REQUEST_TIMEOUT_MS = 5000
export const VIACEP_BASE_URL = 'https://viacep.com.br/ws'
export const CEP_SEARCH_URL =
  'https://buscacepinter.correios.com.br/app/endereco/index.php'
