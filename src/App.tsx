
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import Introduction from './components/Introduction';
import Projects from './components/Projects';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0288d1', // A more solid, readable blue
    },
    secondary: {
      main: '#66bb6a', // A slightly more vibrant green for accents
    },
    background: {
      default: '#f1f8e9', // Very soft pastel green
      paper: '#ffffff', // Pure white for cards to pop
    },
    text: {
      primary: '#263238', // Dark blue-grey for high contrast text
      secondary: '#546e7a', // Medium blue-grey
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
  },
  shape: {
    borderRadius: 16, // Slightly more rounded
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Full pill shape
          padding: '10px 24px', // More breathing room
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)', // Very subtle shadow
          border: '1px solid rgba(0,0,0,0.03)', // Subtle border definition
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // White AppBar
          color: '#263238', // Dark text
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)', // Minimal shadow
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Avatar
              src="/logo.png"
              alt="Logo"
              sx={{
                width: 40,
                height: 40,
                mr: 2
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              yyyyywaiwai's website
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Introduction />
          <Projects />
        </main>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <IconButton
              aria-label="Twitter"
              component="a"
              href="https://x.com/yyyyyy_public"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: '#1DA1F2',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <XIcon />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              component="a"
              href="https://github.com/yyyywaiwai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: '#333',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            2025 yyyywaiwai, All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
