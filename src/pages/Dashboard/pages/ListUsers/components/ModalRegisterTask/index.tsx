import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Modal } from '../../../../../../components/ModalGeneral'
import { useAuthStore } from '../../../../../../stores/userStore'
import { RegisterTask } from '../../../../../../interfaces/tasks.interface'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createTask } from '../../../../../../services/tasks.service'

interface ModalRegisterTaskProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ModalRegisterTask({
  isOpen,
  setIsOpen,
}: ModalRegisterTaskProps) {
  const { register, handleSubmit, reset } = useForm<RegisterTask>({})

  const [priority, setPriority] = useState('')

  const { user } = useAuthStore((state) => state)

  const { mutate, isLoading } = useMutation(
    ({ title, description, conclusionDate, priority }: RegisterTask) =>
      createTask({
        title: title?.trim(),
        description: description?.trim(),
        priority: priority?.trim(),
        conclusionDate,
        userId: user.id,
      }),
    {
      onSuccess: () => {
        toast.success('Tarefa criada com sucesso!', {
          autoClose: 1500,
        })
        reset()
      },
      onError: () => {
        toast.error('Ocorreu algum erro ao criar a tarefa', {
          autoClose: 1500,
        })
      },
    },
  )

  const onSubmit = handleSubmit(
    ({ title, description, conclusionDate, priority }) => {
      mutate({
        title: title?.trim(),
        description: description?.trim(),
        priority: priority?.trim(),
        conclusionDate,
        userId: user.id,
      })
    },
  )

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Cadastrar usuário">
      <form onSubmit={onSubmit}>
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
        <TextField
          required
          color="primary"
          label="Data de Conclusão"
          type="number"
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
