export const useApiRequest = async (url, options = {}, config = {}) => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiUrl
  const method = options.method || 'GET'
  const headers = {
    accept: 'application/json',
    'Authorization': `Bearer ${runtimeConfig.public.apiToken}`,
    ...config.headers
  }
  const response = await useFetch(apiUrl + url, {
    ...options,
    method,
    headers
  })
  return response
}