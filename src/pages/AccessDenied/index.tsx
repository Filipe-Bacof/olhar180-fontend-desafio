import { Container } from '@mui/system'
import { Box, Typography } from '@mui/material'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export function AccessDenied() {
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
          src={Logo}
          alt="Logo Aplicação Gerenciamento de Tarefas"
          width="300px"
        />
        <Typography variant="h5">
          Ops! Parece que você não tem permissão para acessar essa página. Por
          favor, entre em contato com seu administrador.
        </Typography>
        <Link to="/dashboard">Voltar para página inicial</Link>
      </Box>
    </Container>
  )
}
