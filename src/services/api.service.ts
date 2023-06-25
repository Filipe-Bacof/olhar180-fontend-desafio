import Axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

export const Api: AxiosInstance = Axios.create({
  baseURL: 'https://olhar180-backend-desafio-production.up.railway.app',
  withCredentials: true,
})

Api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`

    return Promise.resolve(config)
  },
  (err) => {
    return Promise.reject(err)
  },
)
