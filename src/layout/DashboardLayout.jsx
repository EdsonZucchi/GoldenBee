import { useState } from 'react'
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Logo from '../components/Logo'
import { colors } from '../theme/tokens'

const DRAWER_WIDTH = 248

/** Layout da área autenticada: sidebar fixa (desktop) + drawer (mobile). */
export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colors.charcoal }}>
      {/* Sidebar permanente (desktop) */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* Drawer temporário (mobile) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', border: 'none' },
          }}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      </Box>

      {/* Conteúdo */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar só no mobile (botão do menu) */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            display: { md: 'none' },
            bgcolor: colors.charcoal,
            borderBottom: '1px solid rgba(245,166,35,.12)',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Abrir menu"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Logo size="small" />
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
