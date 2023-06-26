export interface User {
  email: string
  password: string
  token?: string
}

export interface UserRegister {
  id?: number
  name: string
  surname: string
  email: string
  password: string
  githubUrl: string | null
  token?: string
}

export interface UserDataLogIn {
  message: string
  token: string
  user: {
    id: number
    email: string
    name: string
    surname: string
    githubUrl: string
  }
}
