export interface RegisterTask {
  title: string
  description: string
  conclusionDate: number
  completed?: number
  priority: string
  userId?: number
}

export interface UpdateTask {
  title: string
  description: string
  conclusionDate: number
  completed: number
  priority: string
  userId?: number
}
export interface UpdateComplete {
  id: number
  completed: number
}

export interface TaskInfo {
  id: number
  title: string
  description: string
  conclusionDate: number
  completed: number
  priority: string
  userId?: number
}
