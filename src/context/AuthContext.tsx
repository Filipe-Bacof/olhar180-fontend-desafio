import { User, UserRegister } from '../interfaces/users.interface'
import { ReactNode, createContext } from 'react'
import { signin, signup } from '../services/auth.service'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { useAuthStore } from '../stores/userStore'

type AuthContextType = {
  signIn: ({ email, password }: User) => Promise<void>
  signUp: ({
    name,
    surname,
    email,
    password,
    githubUrl,
  }: UserRegister) => Promise<void>
}

type AuthContextProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProps) {
  const { handleAddUser } = useAuthStore((state: any) => state)

  async function signIn({ email, password }: User) {
    await signin({
      email,
      password,
    })
      .then(({ data }) => {
        Cookies.set('token', data?.token, { expires: 1 })
        handleAddUser(data.user)
      })
      .catch(({ data }) => {
        toast.error(data?.message || 'Ocorreu um erro na autenticação.', {
          autoClose: 1500,
        })
      })
  }

  async function signUp({
    name,
    surname,
    email,
    password,
    githubUrl,
  }: UserRegister) {
    await signup({
      name,
      surname,
      email,
      password,
      githubUrl,
    })
      .then(({ data }) =>
        toast.success(data?.message || 'Usuário criado com sucesso', {
          autoClose: 1500,
        }),
      )
      .catch(({ data }) =>
        toast.error(data?.message || 'Ocorreu um erro ao criar o usuário', {
          autoClose: 1500,
        }),
      )
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
