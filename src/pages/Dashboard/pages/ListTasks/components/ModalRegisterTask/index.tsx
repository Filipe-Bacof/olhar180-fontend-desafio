import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '../../../../../../components/ModalGeneral'
import { useAuthStore } from '../../../../../../stores/userStore'
import { RegisterTask } from '../../../../../../interfaces/tasks.interface'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createTask } from '../../../../../../services/tasks.service'
import { generateTimestampWithDateAndTime } from '../../../../../../utils/timeControl'
import './style.css'

interface ModalRegisterTaskProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ModalRegisterTask({
  isOpen,
  setIsOpen,
}: ModalRegisterTaskProps) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset } = useForm<RegisterTask>({})

  const [priority, setPriority] = useState('')

  const { user } = useAuthStore((state) => state)

  const { mutate, isLoading } = useMutation(
    ({ title, description, conclusionDate, priority, userId }: RegisterTask) =>
      createTask({
        title,
        description,
        priority,
        conclusionDate,
        userId,
      }),
    {
      onSuccess: () => {
        toast.success('Tarefa criada com sucesso!', {
          autoClose: 1500,
        })
        reset()
        setChosenDay('')
        setChosenHour('')
        setPriority('')
        setIsOpen((prevState) => !prevState)
        queryClient.invalidateQueries(['tasks'])
      },
      onError: () => {
        toast.error('Ocorreu algum erro ao criar a tarefa', {
          autoClose: 1500,
        })
      },
    },
  )

  const onSubmit = handleSubmit(({ title, description, priority }) => {
    const conclusion = generateTimestampWithDateAndTime(chosenDay, chosenHour)
    mutate({
      title: title?.trim(),
      description: description?.trim(),
      priority: priority?.trim(),
      conclusionDate: conclusion,
      userId: user.id,
    })
  })

  const [chosenDay, setChosenDay] = useState('')
  const [chosenHour, setChosenHour] = useState('')

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cadastrar usuário">
      <form className="form" onSubmit={onSubmit}>
        <TextField
          required
          color="primary"
          type="text"
          label="Título"
          sx={{ width: '100%' }}
          {...register('title')}
        />
        <TextField
          required
          color="primary"
          type="text"
          label="Descrição"
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
        <Button
          id="button-primary"
          type="submit"
          disabled={isLoading}
          variant="contained"
        >
          {isLoading && <CircularProgress size={16} />}
          {!isLoading && 'Cadastrar'}
        </Button>
      </form>
    </Modal>
  )
}
