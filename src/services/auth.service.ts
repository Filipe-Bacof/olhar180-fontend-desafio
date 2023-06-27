import { AxiosResponse } from 'axios'
import {
  User,
  UserDataLogIn,
  UserRegister,
} from '../interfaces/users.interface'
import { Api } from './api.service'

export const signin = async ({
  email,
  password,
}: User): Promise<AxiosResponse<UserDataLogIn>> => {
  const result = await Api.post('/auth/login', {
    email,
    password,
  })

  return result
}

export const getUserById = async (id: number) => {
  const result = await Api.get(`/users/${id}`)

  return result
}

export const getAllUsers = async () => {
  const result = await Api.get('/users')

  return result
}

export const deleteUser = async (id: number) => {
  const result = await Api.delete(`/users/${id}`)

  return result
}

export const updateUser = async (
  id: number | undefined,
  { name, surname, email, password, githubUrl }: UserRegister,
) => {
  const result = await Api.put(`/users/${id}`, {
    name,
    surname,
    email,
    password,
    githubUrl,
  })

  return result
}

export const signup = async ({
  name,
  surname,
  email,
  password,
  githubUrl,
}: UserRegister) => {
  const result = await Api.post('/auth/register', {
    name,
    surname,
    email,
    password,
    githubUrl,
  })
  return result
}

export const forgot = async (email: string) => {
  const result = await Api.post('/auth/forgot', {
    email,
  })

  return result
}

export const newpass = async ({ email, password, token }: User) => {
  const result = await Api.post('/auth/newpass', {
    email,
    password,
    token,
  })
  return result
}
