import { Paper, Typography, Box, CircularProgress } from '@mui/material'

import { useAuthStore } from '../../../../stores/userStore'

export function Profile() {
  const { user } = useAuthStore((state) => state)

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
            width: '100%',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            marginBlock: '4rem',
          }}
        >
          <h1>infos</h1>
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
