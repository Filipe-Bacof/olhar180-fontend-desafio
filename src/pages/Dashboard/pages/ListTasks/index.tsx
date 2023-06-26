import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  Tooltip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import WarningIcon from '@mui/icons-material/Warning'
import {
  TaskInfo,
  UpdateComplete,
} from '../../../../interfaces/tasks.interface'
import { EmptyList } from '../../../../components/EmptyList'
import { ModalEditTask } from './components/ModalEditTask'
import { StyledTableCell } from '../../../../components/StyledTableCell'
import { StyledTableRow } from '../../../../components/StyledTableRow'
import { ModalRegisterTask } from './components/ModalRegisterTask'
import { ModalDeleteTask } from './components/ModalDeleteTask'
import { useAuthStore } from '../../../../stores/userStore'
import { SwitchIOS } from '../../../../components/SwitchIOS'
import { updateCompleted } from '../../../../services/tasks.service'
import {
  generateDateWithTimestamp,
  generateTimeWithTimestamp,
} from '../../../../utils/timeControl'

export function ListTasks() {
  const { user } = useAuthStore((state) => state)
  const queryClient = useQueryClient()
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [isDeletingTask, setIsDeletingTask] = useState(false)
  const [currentTask, setCurrentTask] = useState<number>()
  const { data: tasks, isLoading } = useQuery(['tasks'], () =>
    getUserById(user.id),
  )

  function verifyIfThisIsLate(date: number) {
    const timestamp = new Date(date)
    const datenow = new Date()
    return datenow > timestamp
  }

  const { mutate: updateConclusion, isLoading: updatingConclusion } =
    useMutation(
      ({ id, completed }: UpdateComplete) => updateCompleted(id, completed),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks'])
        },
      },
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
          Adicionar Tarefa
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
                            Data Limite
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Concluída
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Prioridade
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Ações
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
                            completed,
                            priority,
                          }: TaskInfo) => (
                            <StyledTableRow key={id}>
                              <StyledTableCell align="center">
                                {title}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {description}
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  color:
                                    verifyIfThisIsLate(conclusionDate) &&
                                    completed === 0
                                      ? 'red'
                                      : '',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                align="center"
                              >
                                {verifyIfThisIsLate(conclusionDate) &&
                                  completed === 0 && (
                                    <Tooltip
                                      title="Essa tarefa está atrasada"
                                      arrow
                                      placement="bottom"
                                    >
                                      <WarningIcon />
                                    </Tooltip>
                                  )}
                                &nbsp;
                                {generateDateWithTimestamp(
                                  conclusionDate,
                                )} - {generateTimeWithTimestamp(conclusionDate)}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <SwitchIOS
                                  color="warning"
                                  checked={completed === 1}
                                  disabled={updatingConclusion}
                                  onChange={() => {
                                    const newValue = completed === 1 ? 0 : 1
                                    updateConclusion({
                                      id,
                                      completed: newValue,
                                    })
                                  }}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                sx={{
                                  textTransform: 'capitalize',
                                  fontWeight: 'bold',
                                  color:
                                    priority === 'alta'
                                      ? 'red'
                                      : priority === 'media'
                                      ? 'orange'
                                      : 'green',
                                }}
                                align="center"
                              >
                                {priority}
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
            </div>
          ) : (
            <EmptyList />
          )}
        </>
      )}
      <ModalEditTask
        isOpen={isEditingTask}
        setIsOpen={setIsEditingTask}
        currentTask={currentTask || 0}
      />

      <ModalRegisterTask isOpen={isAddingTask} setIsOpen={setIsAddingTask} />

      <ModalDeleteTask
        isOpen={isDeletingTask}
        setIsOpen={setIsDeletingTask}
        currentTask={currentTask || 0}
      />
    </div>
  )
}
