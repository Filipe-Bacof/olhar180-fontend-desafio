export interface RegisterTask {
  id?: number
  title: string
  description: string
  conclusionDate: number
  priority: string
  userId?: number
}

export interface TaskInfo {
  id?: number
  title: string
  description: string
  conclusionDate: number
  priority: string
  createdAt: number
  userId?: number
}
