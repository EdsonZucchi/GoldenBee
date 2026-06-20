import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import EventIcon from '@mui/icons-material/Event'
import GroupIcon from '@mui/icons-material/Group'
import StarIcon from '@mui/icons-material/Star'
import BarChartIcon from '@mui/icons-material/BarChart'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PlaceIcon from '@mui/icons-material/Place'
import LogoutIcon from '@mui/icons-material/Logout'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { initials, colorFromString } from '../utils/avatar'
import { colors } from '../theme/tokens'

const NAV = [
  {
    group: 'Geral',
    items: [
      { label: 'Início', to: '/app', icon: <HomeIcon />, exact: true },
      { label: 'Tours', to: '/app/tours', icon: <EventIcon /> },
      { label: 'Participantes', to: '/app/participantes', icon: <GroupIcon /> },
      { label: 'Avaliações', to: '/app/avaliacoes', icon: <StarIcon /> },
    ],
  },
  {
    group: 'Dados',
    items: [
      { label: 'Estatísticas', to: '/app/estatisticas', icon: <BarChartIcon /> },
      { label: 'Ranking', to: '/app/ranking', icon: <EmojiEventsIcon /> },
      { label: 'Locais', to: '/app/locais', icon: <PlaceIcon /> },
    ],
  },
]

export default function Sidebar({ onNavigate }) {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function go(to) {
    navigate(to)
    onNavigate?.()
  }

  function isActive(item) {
    return item.exact ? pathname === item.to : pathname.startsWith(item.to)
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const name = user?.displayName || user?.email || 'Usuário'

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.charcoal,
        borderRight: '1px solid rgba(245,166,35,.12)',
      }}
    >
      <Box
        sx={{ p: 2.5, cursor: 'pointer' }}
        onClick={() => go('/app')}
        role="button"
        aria-label="Início"
      >
        <Logo size="medium" />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5 }}>
        {NAV.map((section) => (
          <Box key={section.group} sx={{ mb: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: colors.muted, px: 1.5, fontSize: '.65rem' }}
            >
              {section.group}
            </Typography>
            <List disablePadding>
              {section.items.map((item) => {
                const active = isActive(item)
                return (
                  <ListItemButton
                    key={item.to}
                    onClick={() => go(item.to)}
                    sx={{
                      borderRadius: 1.5,
                      mb: 0.5,
                      color: active ? colors.amber : colors.sand,
                      bgcolor: active ? 'rgba(245,166,35,.12)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(245,166,35,.08)' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{ primary: { fontSize: '.9rem', fontWeight: active ? 600 : 500 } }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(232,220,200,.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Avatar sx={{ bgcolor: colorFromString(name), width: 36, height: 36, fontSize: '.85rem' }}>
          {initials(name)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: colors.cream, fontWeight: 600 }} noWrap>
            {name}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.muted }}>
            {isAdmin ? 'Administrador' : 'Participante'}
          </Typography>
        </Box>
        <IconButton onClick={handleLogout} aria-label="Sair" sx={{ color: colors.muted }}>
          <LogoutIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
