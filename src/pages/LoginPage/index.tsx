import { useContext, useState } from 'react'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { User } from '../../interfaces/users.interface'
import Logo from '../../assets/logo.png'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
export function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit } = useForm<User>({})
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await signIn({ email, password }).then(() => navigate('/dashboard/tasks'))
  })

  return (
    <section>
      <form onSubmit={onSubmit}>
        <img src={Logo} className="bg-logo" alt="Logo TaskManager" />
        <h2>Task Manager</h2>
        <p>Seja bem-vindo!</p>
        <p>Preencha as informações abaixo.</p>
        <div className="fields">
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
            <Button id="button-primary" type="submit" variant="contained">
              Acessar
            </Button>
            <Link to={'/signup'}>
              <h3>Ainda não tem uma conta?</h3>
            </Link>
            <Link to={'/forgotpass'}>
              <h4>Esqueceu sua senha?</h4>
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
}
