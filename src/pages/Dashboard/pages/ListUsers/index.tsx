import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../../../../services/auth.service'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TaskInfo } from '../../../../interfaces/tasks.interface'
import { EmptyList } from '../../../../components/EmptyList'
import { ModalEditTask } from './components/ModalEditTask'
import { StyledTableCell } from '../../../../components/StyledTableCell'
import { StyledTableRow } from '../../../../components/StyledTableRow'
import { ModalRegisterTask } from './components/ModalRegisterTask'
import { ModalDeleteTask } from './components/ModalDeleteTask'
import { useAuthStore } from '../../../../stores/userStore'

export function ListTasks() {
  const { user } = useAuthStore((state) => state)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [isDeletingTask, setIsDeletingTask] = useState(false)
  const [currentTask, setCurrentTask] = useState<number>()
  const { data: tasks, isLoading } = useQuery(['tasks'], () =>
    getUserById(user.id),
  )

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" sx={{ marginBlock: '1.3rem' }}>
          Minhas Tarefas
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddingTask((prevState) => !prevState)}
        >
          Nova Tarefa
        </Button>
      </Box>
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBlock: '4rem',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {tasks?.data?.tasks.length ? (
            <div>
              <Paper>
                <div>
                  <div>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Título
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Descrição
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Data de Conclusão
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Prioridade
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Data de Criação
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            Controles
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks?.data?.tasks?.map(
                          ({
                            id,
                            title,
                            description,
                            conclusionDate,
                            priority,
                            createdAt,
                          }: TaskInfo) => (
                            <StyledTableRow key={id}>
                              <StyledTableCell align="center">
                                {title}
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                {description}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {conclusionDate}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {priority}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {createdAt}
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  display: 'flex',
                                  gap: '20px',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                                align="center"
                              >
                                <EditIcon
                                  onClick={() => {
                                    setCurrentTask(id)
                                    setIsEditingTask((prevState) => !prevState)
                                  }}
                                />

                                <DeleteIcon
                                  onClick={() => {
                                    setCurrentTask(id)
                                    setIsDeletingTask((prevState) => !prevState)
                                  }}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Paper>

              <ModalEditTask
                isOpen={isEditingTask}
                setIsOpen={setIsEditingTask}
                currentTask={currentTask || 0}
              />

              <ModalRegisterTask
                isOpen={isAddingTask}
                setIsOpen={setIsAddingTask}
              />

              <ModalDeleteTask
                isOpen={isDeletingTask}
                setIsOpen={setIsDeletingTask}
                currentTask={currentTask || 0}
              />
            </div>
          ) : (
            <EmptyList />
          )}
        </>
      )}
    </div>
  )
}
