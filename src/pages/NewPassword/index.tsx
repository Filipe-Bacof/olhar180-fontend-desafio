import { useState } from 'react'
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { User } from '../../interfaces/users.interface'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { newpass } from '../../services/auth.service'
import { toast } from 'react-toastify'
import '../SignupPage/style.css'

export function NewPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { register, handleSubmit } = useForm<User>({})
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(
    async ({ email, password, token }: User) =>
      await newpass({ email, password, token }),
    {
      onSuccess: () => {
        navigate('/')
        toast.success('Sua senha foi redefinida com sucesso!', {
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

  const onSubmit = handleSubmit(({ email, password, token }) => {
    mutate({ email, password, token })
  })

  return (
    <section className="section">
      <form onSubmit={onSubmit}>
        <img className="bg-logo" src={Logo} alt="TaskManager Logo" />
        <p className="">
          Insira o token recebido no email para redefinir a senha:
        </p>
        <div className="fields">
          <TextField
            required
            color="primary"
            type="string"
            label="Token recebido no E-mail"
            {...register('token')}
          />
          <TextField
            required
            color="primary"
            type="email"
            label="Seu Email"
            {...register('email')}
          />
          <TextField
            required
            color="primary"
            type={isPasswordVisible ? 'text' : 'password'}
            label="Sua Nova Senha"
            {...register('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            id="button-primary"
            type="submit"
            disabled={isLoading}
            variant="contained"
          >
            {isLoading && <CircularProgress size={16} />}
            {!isLoading && 'Redefinir Senha'}
          </Button>
        </div>
      </form>
    </section>
  )
}
