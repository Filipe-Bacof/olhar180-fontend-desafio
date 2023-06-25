import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: number
  email: string
  name: string
  surname: string
  githubUrl?: string
}

export interface UserStore {
  user: User
  handleAddUser: (data: User) => void
  handleRemoveUser: () => void
}

export const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as User,

      handleAddUser: ({ id, name, surname, email, githubUrl }: User) => {
        set({
          user: { id, name, surname, email, githubUrl },
        })
      },

      handleRemoveUser: () => set({}, true),
    }),
    { name: 'olhar180-user' },
  ),
)
