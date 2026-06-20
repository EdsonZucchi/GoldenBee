import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Link, TextField, Typography } from '@mui/material'
import AuthLayout from '../layout/AuthLayout'
import { useAuth } from '../context/AuthContext'

const INITIAL_FORM = { name: '', email: '', phone: '', password: '' }

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Junte-se aos tours gastronômicos">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Nome"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          autoComplete="name"
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          autoComplete="email"
        />
        <TextField
          label="Celular"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          autoComplete="tel"
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          autoComplete="new-password"
          helperText="Mínimo de 6 caracteres"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Já tem conta?{' '}
          <Link component={RouterLink} to="/login">
            Entrar
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}
