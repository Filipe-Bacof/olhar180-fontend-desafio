import React, { useState } from 'react'
import {
  Button,
  MenuItem,
  TextField,
  Box,
  Typography,
  Modal,
  CircularProgress,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { RegisterTask } from '../../../../../../interfaces/tasks.interface'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getTaskById,
  updateTask,
} from '../../../../../../services/tasks.service'
import { toast } from 'react-toastify'
import {
  convertDate,
  generateDateWithTimestamp,
  generateTimeWithTimestamp,
  generateTimestampWithDateAndTime,
} from '../../../../../../utils/timeControl'
import '../ModalRegisterTask/style.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

interface ModalEditTaskProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentTask: number
}

export function ModalEditTask({
  isOpen,
  setIsOpen,
  currentTask,
}: ModalEditTaskProps) {
  const [priority, setPriority] = useState('')
  const [completedField, setCompletedField] = useState('')
  const [chosenDay, setChosenDay] = useState('')
  const [chosenHour, setChosenHour] = useState('')
  useQuery(['tasks', currentTask], () => getTaskById(currentTask), {
    onSuccess: ({ data }) => {
      const taskData: RegisterTask = data
      reset(taskData)
      setChosenDay(convertDate(generateDateWithTimestamp(data?.conclusionDate)))
      setChosenHour(generateTimeWithTimestamp(data?.conclusionDate))
      setCompletedField(`${data?.completed}`)
      setPriority(data?.priority)
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ title, description, priority }: RegisterTask) =>
      updateTask(currentTask, {
        title: title?.trim(),
        description: description?.trim(),
        priority: priority?.trim(),
        conclusionDate: generateTimestampWithDateAndTime(chosenDay, chosenHour),
        completed: Number(completedField),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
        setChosenDay('')
        setChosenHour('')
        setCompletedField('')
        setPriority('')
        setIsOpen((prevState) => !prevState)
        toast.success('Tarefa foi atualizada com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu algum erro ao editar essa Tarefa!', {
          autoClose: 1500,
        })
      },
    },
  )
  const { register, reset, handleSubmit } = useForm<RegisterTask>()

  const onSubmit = handleSubmit(({ title, description, priority }) => {
    mutate({
      title: title?.trim(),
      description: description?.trim(),
      priority: priority?.trim(),
      conclusionDate: generateTimestampWithDateAndTime(chosenDay, chosenHour),
      completed: Number(completedField),
    })
    reset()
  })

  return (
    <Modal open={isOpen} onClose={() => setIsOpen((prevState) => !prevState)}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <Typography fontSize="1.3rem">Editar tarefa</Typography>
          <Close
            fontSize="large"
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsOpen((prevState) => !prevState)}
          />
        </Box>
        <form className="form" onSubmit={onSubmit}>
          <TextField
            label="Título"
            color="primary"
            InputLabelProps={{ shrink: true }}
            sx={{ width: '100%' }}
            {...register('title')}
          />
          <TextField
            color="primary"
            label="Descrição"
            InputLabelProps={{ shrink: true }}
            sx={{ width: '100%' }}
            {...register('description')}
          />
          <Typography sx={{ paddingRight: '12rem' }} noWrap component="div">
            Data de Conclusão
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <TextField
              sx={{ display: 'flex', width: '160px' }}
              type="date"
              color="warning"
              variant="outlined"
              required
              value={chosenDay}
              onChange={(e) => setChosenDay(e.target.value)}
            />
            <TextField
              sx={{ display: 'flex', width: '160px' }}
              type="time"
              color="warning"
              variant="outlined"
              value={chosenHour}
              onChange={(e) => setChosenHour(e.target.value)}
              required
            />
          </Box>
          <TextField
            sx={{ display: 'flex', width: '100%' }}
            required
            color="primary"
            select
            defaultValue={'baixa'}
            label="Prioridade"
            type="priority"
            {...register('priority')}
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <MenuItem value={'baixa'} key={1}>
              Baixa
            </MenuItem>
            <MenuItem value={'media'} key={2}>
              Média
            </MenuItem>
            <MenuItem value={'alta'} key={3}>
              Alta
            </MenuItem>
          </TextField>
          <TextField
            sx={{ display: 'flex', width: '100%' }}
            required
            color="primary"
            select
            label="Está Concluída?"
            type="completed"
            value={completedField}
            onChange={(event) => setCompletedField(event.target.value)}
          >
            <MenuItem value={1} key={1}>
              SIM
            </MenuItem>
            <MenuItem value={0} key={2}>
              NÃO
            </MenuItem>
          </TextField>
          <Button
            sx={{ paddingBlock: '1rem' }}
            variant="contained"
            color="error"
            type="submit"
          >
            {isLoading && <CircularProgress size={16} />}
            {!isLoading && 'Concluído'}
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
