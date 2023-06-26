import {
  Paper,
  Typography,
  Box,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../../stores/userStore'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useState } from 'react'
import { updateUser } from '../../../../services/auth.service'
import { UserRegister } from '../../../../interfaces/users.interface'

export function Profile() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { user } = useAuthStore((state) => state)

  const [nameField, setNameField] = useState(user.name)
  const [surnameField, setSurnameField] = useState(user.surname)
  const [githubUrlLink, setGithubUrlLink] = useState(user.githubUrl || '')
  const [emailField, setEmailField] = useState(user.email)
  const [passwordField, setPasswordField] = useState('')

  const { mutate, isLoading } = useMutation(
    ({ name, surname, email, password, githubUrl }: UserRegister) =>
      updateUser(user.id, {
        name,
        surname,
        email,
        password,
        githubUrl,
      }),
    {
      onSuccess: () => {
        toast.success('Perfil atualizado com sucesso!', {
          autoClose: 1500,
        })
      },
      onError: () => {
        toast.error('Ocorreu algum erro ao atualizar o seu perfil', {
          autoClose: 1500,
        })
      },
    },
  )

  function sendData() {
    mutate({
      name: nameField.trim(),
      surname: surnameField.trim(),
      email: emailField.trim(),
      password: passwordField.trim(),
      githubUrl: githubUrlLink.trim() || null,
    })
  }

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
          Editar meu Usuário
        </Typography>
      </Box>
      {user ? (
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            marginBlock: '4rem',
            gap: '1rem',
          }}
        >
          <Typography variant="h6">Altere o seu nome de usuário:</Typography>
          <TextField
            required
            color="primary"
            type="text"
            label="Nome"
            sx={{ width: '100%' }}
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
          />
          <TextField
            required
            color="primary"
            type="text"
            label="Sobrenome"
            sx={{ width: '100%' }}
            value={surnameField}
            onChange={(e) => setSurnameField(e.target.value)}
          />
          <Typography variant="h6">
            Altere sua foto de perfil compartilhando
            <br />
            sua URL do seu GitHub:
            <br />
            Exemplo: https://github.com/seu-usuário
          </Typography>
          <TextField
            required
            color="primary"
            type="text"
            label="GitHub URL"
            sx={{ width: '100%' }}
            value={githubUrlLink}
            onChange={(e) => setGithubUrlLink(e.target.value)}
          />
          <Typography variant="h6">Altere o seu e-mail:</Typography>
          <TextField
            required
            color="primary"
            type="email"
            label="E-mail"
            sx={{ width: '100%' }}
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
          />
          <Typography variant="h6">Altere a sua senha:</Typography>
          <TextField
            required
            id="input-primary"
            color="primary"
            label="Password"
            defaultValue={''}
            value={passwordField}
            onChange={(e) => setPasswordField(e.target.value)}
            type={isPasswordVisible ? 'text' : 'password'}
            sx={{ width: '100%' }}
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
            disabled={isLoading}
            variant="contained"
            onClick={sendData}
          >
            {isLoading && <CircularProgress size={16} />}
            {!isLoading && 'Salvar Mudanças'}
          </Button>
        </Box>
      ) : (
        <div>
          <Paper>
            <CircularProgress color="secondary" />
          </Paper>
        </div>
      )}
    </div>
  )
}
