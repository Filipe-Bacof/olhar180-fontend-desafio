import ErrorIcon from '@mui/icons-material/Error'

export function EmptyList() {
  return (
    <section>
      <ErrorIcon />
      <h1>Nenhum registro foi encontrado.</h1>
    </section>
  )
}
