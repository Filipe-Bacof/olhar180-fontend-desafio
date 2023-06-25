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
  useQuery(['tasks', currentTask], () => getTaskById(currentTask), {
    onSuccess: ({ data }) => {
      const taskData: RegisterTask = data
      reset(taskData)
    },
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ title, description, conclusionDate, priority }: RegisterTask) =>
      updateTask(currentTask, {
        title: title?.trim(),
        description: description?.trim(),
        priority: priority?.trim(),
        conclusionDate,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks'])
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

  const onSubmit = handleSubmit(
    ({ title, description, conclusionDate, priority }) => {
      mutate({
        title: title?.trim(),
        description: description?.trim(),
        priority: priority?.trim(),
        conclusionDate,
      })
      reset()
    },
  )

  return (
    <Modal open={isOpen} onClose={() => setIsOpen((prevState) => !prevState)}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontSize="1.3rem">Editar tarefa</Typography>
          <Close
            fontSize="large"
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsOpen((prevState) => !prevState)}
          />
        </Box>
        <form onSubmit={onSubmit}>
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
          <TextField
            color="warning"
            label="Data de Conclusão"
            type="date"
            sx={{ width: '100%' }}
            InputLabelProps={{ shrink: true }}
            {...register('conclusionDate')}
          />
          <TextField
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
            <MenuItem value={'Baixa'} key={1}>
              Baixa
            </MenuItem>
            <MenuItem value={'Média'} key={2}>
              Média
            </MenuItem>
            <MenuItem value={'Alta'} key={3}>
              Alta
            </MenuItem>
          </TextField>

          <Button
            sx={{ paddingBlock: '1rem' }}
            variant="contained"
            color="warning"
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
