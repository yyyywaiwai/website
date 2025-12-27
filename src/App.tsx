
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
import { useState, useEffect } from 'react';
import Introduction from './components/Introduction';
import Projects from './components/Projects';
import Music from './components/Music';
import rickrollGif from './assets/rickroll-roll.gif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006a6a', // Deep Teal (M3-inspired)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4e5f7d', // Muted Sapphire
    },
    background: {
      default: '#fcfdf6', // M3 Surface-like off-white
      paper: '#ffffff',
    },
    text: {
      primary: '#191c1c', // M3 On-Surface
      secondary: '#404949', // M3 On-Surface-Variant
    },
    outline: {
      main: '#6f7979', // Custom outline color for M3
    }
  } as any, // Cast to any to allow custom palette keys if needed
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Noto Sans JP", "Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.04em',
      color: '#191c1c',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: '#191c1c',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#191c1c'
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: '#191c1c'
    },
    h5: {
      fontWeight: 600,
      color: '#191c1c'
    },
    h6: {
      fontWeight: 600,
      color: '#191c1c'
    },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // Fully pill-shaped for M3
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          },
        },
        outlined: {
          borderColor: '#6f7979', // M3 Outline color
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28, // M3 Large Card border radius
          backgroundImage: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #e0e3e3', // Subtle M3-style outline
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(252, 253, 246, 0.8)', // M3 Surface with some opactiy
          backdropFilter: 'blur(8px)',
          color: '#191c1c',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e3e3',
        },
      },
    },
  },
});

function App() {
  const [isRickrolled, setIsRickrolled] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isRickrolled) {
      // Fade in after image switch
      const fadeInTimer = setTimeout(() => {
        setIsFading(false);
      }, 50);

      // Start fade out before reverting
      const fadeOutTimer = setTimeout(() => {
        setIsFading(true);
      }, 2500);

      // Revert to original
      const revertTimer = setTimeout(() => {
        setIsRickrolled(false);
        // Fade back in after revert
        setTimeout(() => setIsFading(false), 50);
      }, 3000);

      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(fadeOutTimer);
        clearTimeout(revertTimer);
      };
    }
  }, [isRickrolled]);

  const handleAvatarClick = () => {
    if (!isRickrolled) {
      setIsFading(true);
      setTimeout(() => {
        setIsRickrolled(true);
      }, 200);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Avatar
              src={isRickrolled ? rickrollGif : "/icon.jpg"}
              alt="Avatar"
              onClick={handleAvatarClick}
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                cursor: 'pointer',
                opacity: isFading ? 0 : 1,
                transition: 'transform 0.3s ease, opacity 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              yyyywaiwai's website
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Introduction />
          <Projects />
          <Music />
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
