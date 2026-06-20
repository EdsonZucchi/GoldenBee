import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Dialog,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { colors } from '../theme/tokens'

const EMPTY_FORM = { name: '', email: '', phone: '', password: '' }

const inputSx = {
  '& .MuiInputBase-input': { color: colors.cream },
  '& .MuiInputLabel-root': { color: colors.muted },
  '& .MuiFormHelperText-root': { color: colors.muted },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(232,220,200,.2)' },
}

/** Dialog de autenticação (login/cadastro) acionado a partir da landing. */
export default function AuthDialog({ open, onClose }) {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function switchMode(next) {
    setMode(next)
    setError('')
  }

  function handleExited() {
    // reseta o estado só depois da animação de fechamento
    setForm(EMPTY_FORM)
    setError('')
    setMode('login')
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        await login(form)
      } else {
        await register(form)
      }
      onClose()
      navigate('/app')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        transition: { onExited: handleExited },
        paper: {
          sx: {
            bgcolor: colors.charcoal,
            backgroundImage: 'none',
            border: '1px solid rgba(245,166,35,.18)',
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Fechar"
        sx={{ position: 'absolute', top: 8, right: 8, color: colors.muted }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Logo size="large" />
          <Typography variant="h6" sx={{ mt: 1.5, color: colors.cream }}>
            {isLogin ? 'Entrar' : 'Criar conta'}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.muted }}>
            {isLogin
              ? 'Acesse sua conta para continuar'
              : 'Junte-se aos tours gastronômicos'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!isLogin && (
            <TextField
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              autoComplete="name"
              sx={inputSx}
            />
          )}

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
            sx={inputSx}
          />

          {!isLogin && (
            <TextField
              label="Celular"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              autoComplete="tel"
              sx={inputSx}
            />
          )}

          <TextField
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            helperText={isLogin ? undefined : 'Mínimo de 6 caracteres'}
            sx={inputSx}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading
              ? isLogin
                ? 'Entrando...'
                : 'Cadastrando...'
              : isLogin
                ? 'Entrar'
                : 'Cadastrar'}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: colors.sand }}>
            {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
            <Link
              component="button"
              type="button"
              onClick={() => switchMode(isLogin ? 'register' : 'login')}
              sx={{ color: colors.amber, verticalAlign: 'baseline' }}
            >
              {isLogin ? 'Cadastre-se' : 'Entrar'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Dialog>
  )
}
