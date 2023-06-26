import { Api } from './api.service'
import { RegisterTask, UpdateTask } from '../interfaces/tasks.interface'

export const getTask = async () => {
  const result = await Api.get('/tasks')

  return result
}

export const getTaskById = async (id: number) => {
  const result = await Api.get(`/tasks/${id}`)

  return result
}

export const createTask = async ({
  title,
  description,
  conclusionDate,
  priority,
  userId,
}: RegisterTask) => {
  const result = await Api.post('/tasks', {
    title,
    description,
    conclusionDate,
    priority,
    userId,
  })

  return result
}

export const deleteTask = async (id: number) => {
  const result = await Api.delete(`/tasks/${id}`)

  return result
}

export const updateTask = async (
  id: number,
  { title, description, conclusionDate, priority }: UpdateTask,
) => {
  const result = await Api.put(`/tasks/${id}`, {
    title,
    description,
    conclusionDate,
    priority,
  })

  return result
}

export const updateCompleted = async (id: number, completed: number) => {
  const result = await Api.put(`/tasks/${id}`, {
    completed,
  })

  return result
}
