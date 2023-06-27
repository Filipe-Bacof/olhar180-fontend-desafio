import { Container } from '@mui/system'
import { Box, Typography } from '@mui/material'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import '../SignupPage/style.css'

export function Page404() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginBlock: '3rem',
        }}
      >
        <img
          className="bg-logo"
          src={Logo}
          alt="Logo Aplicação Gerenciamento de Tarefas"
          width="300px"
        />
        <Typography variant="h5">
          Ops! Parece que a página que você está procurando não existe.
        </Typography>
        <Link
          style={{ color: 'red', textDecoration: 'underline' }}
          to="/dashboard"
        >
          Voltar para página inicial
        </Link>
      </Box>
    </Container>
  )
}
