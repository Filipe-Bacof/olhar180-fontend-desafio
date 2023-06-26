import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../../../../../../services/tasks.service'
import { toast } from 'react-toastify'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ModalDeleteTaskProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentTask: number
}

export function ModalDeleteTask({
  isOpen,
  setIsOpen,
  currentTask,
}: ModalDeleteTaskProps) {
  const queryClient = useQueryClient()
  // Delete user Mutation
  const { mutate } = useMutation((id: number) => deleteTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      setIsOpen((prevState) => !prevState)
      toast.success('Esta tarefa foi deletado!')
    },
    onError: () => {
      toast.error('Ocorreu algum erro ao deletar esta tarefa!')
    },
  })

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsOpen((prevState) => !prevState)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Você realmente deseja deletar esta tarefa?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta operação não poderá ser desfeita!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => mutate(currentTask)}
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
