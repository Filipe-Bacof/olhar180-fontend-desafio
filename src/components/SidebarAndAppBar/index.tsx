import Cookies from 'js-cookie'
import { ReactNode, useState } from 'react'
import Logo from '../../assets/logo.png'
import MuiDrawer from '@mui/material/Drawer'
import { Link, useNavigate } from 'react-router-dom'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

// Icons
import IconButton from '@mui/material/IconButton'
import TaskIcon from '@mui/icons-material/Task'
import PersonIcon from '@mui/icons-material/Person'
import { ChevronLeft, ChevronRight, ExitToApp, Menu } from '@mui/icons-material'

// Components
import { HeaderUser } from '../../components/HeaderUser'

const drawerWidth = 240
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

interface SidebarAndAppBarProps {
  children: ReactNode
}

export function SidebarAndAppBar({ children }: SidebarAndAppBarProps) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const logOut = () => {
    Cookies.remove('token', { path: '/' })
    localStorage.removeItem('olhar180-user')
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" id="app-bar" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prevState) => !prevState)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <Tooltip
              title="Ver Nome de todas as opções do Menu"
              arrow
              placement="right"
            >
              <Menu />
            </Tooltip>
          </IconButton>
          <Box
            className="mobile"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              className="mobile"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                width: '100%',
                gap: '1.5rem',
              }}
            >
              <img src={Logo} alt="TaskManager Logo" width="50px" />
              <Typography variant="h5" noWrap component="div">
                Gerenciador de Tarefas
              </Typography>
            </Box>

            <HeaderUser />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            Menu de Opções
          </Typography>
          <IconButton onClick={() => setOpen((prevState) => !prevState)}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <Link to="tasks">
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Tasks" arrow placement="right">
                    <TaskIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={'Tasks'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="profile">
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Usuário" arrow placement="right">
                    <PersonIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText
                  primary={'Usuário'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />

        <List>
          <ListItem onClick={logOut} disablePadding>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Sair" arrow placement="right">
                  <ExitToApp />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={'Sair'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
