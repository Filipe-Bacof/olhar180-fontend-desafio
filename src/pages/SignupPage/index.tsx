import { useContext, useState } from 'react'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { UserRegister } from '../../interfaces/users.interface'
import Logo from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
export function SignupPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { signUp } = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<UserRegister>({})

  const { mutate, isLoading } = useMutation(
    ({ name, surname, email, password, githubUrl }: UserRegister) =>
      signUp({ name, surname, email, password, githubUrl }),
    {
      onSuccess: () => {
        reset()
        navigate('/')
      },
      onError: () => {
        toast.error('Ocorreu algum erro ao criar o usuário', {
          autoClose: 1500,
        })
      },
    },
  )

  const onSubmit = handleSubmit(
    ({ name, surname, email, password, githubUrl }) => {
      mutate({ name, surname, email, password, githubUrl })
    },
  )

  return (
    <section className="section">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-header">
          <img src={Logo} className="bg-logo" alt="Logo TaskManager" />
          <h2>Task Manager</h2>
          <p>Crie sua conta!</p>
          <p>Preencha as suas informações.</p>
          <p>Gerencie as suas tarefas.</p>
        </div>
        <div className="form-items">
          <div className="fullname">
            <TextField
              sx={{
                width: '200px',
              }}
              required
              color="primary"
              type="text"
              label="Nome"
              {...register('name')}
            />
            <TextField
              sx={{
                width: '200px',
              }}
              required
              color="primary"
              type="text"
              label="Sobrenome"
              {...register('surname')}
            />
          </div>
          <TextField
            sx={{
              width: '400px',
            }}
            color="primary"
            defaultValue={null}
            type="text"
            label="Link para o seu Github"
            {...register('githubUrl')}
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
            id="input-primary"
            color="primary"
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
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
          <div className="register">
            <Button
              id="button-primary"
              type="submit"
              disabled={isLoading}
              variant="contained"
            >
              Criar Conta
            </Button>
            <Link to={'/'}>
              <h3>Já tem uma conta?</h3>
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
}
