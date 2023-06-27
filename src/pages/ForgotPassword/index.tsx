import { Button, TextField, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { User } from '../../interfaces/users.interface'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { forgot } from '../../services/auth.service'
import { toast } from 'react-toastify'
import '../SignupPage/style.css'

export function ForgotPassword() {
  const { register, handleSubmit } = useForm<User>({})
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(
    async (email: string) => await forgot(email),
    {
      onSuccess: () => {
        navigate('/newpass')
        toast.success('Token Enviado para o seu e-mail', {
          autoClose: 4000,
        })
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, {
          autoClose: 2000,
        })
      },
    },
  )

  const onSubmit = handleSubmit(({ email }) => {
    mutate(email)
  })

  return (
    <section className="section">
      <form onSubmit={onSubmit}>
        <img className="bg-logo" src={Logo} alt="TaskManager Logo" />
        <p className="">
          Insira seu email para solicitar o token de redefinição de senha:
        </p>
        <div className="fields">
          <TextField
            sx={{
              width: '300px',
            }}
            required
            color="warning"
            type="email"
            label="Seu Email"
            {...register('email')}
          />
          <Button
            id="button-primary"
            type="submit"
            disabled={isLoading}
            variant="contained"
          >
            {isLoading && <CircularProgress size={16} />}
            {!isLoading && 'Enviar Token'}
          </Button>
        </div>
      </form>
    </section>
  )
}
