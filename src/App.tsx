import { useEffect, useMemo, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Introduction from './components/Introduction';
import Music from './components/Music';
import Projects from './components/Projects';
import rickrollGif from './assets/rickroll-roll.gif';

const buildTheme = (isDark: boolean) => createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    primary: {
      main: isDark ? '#0a84ff' : '#0071e3',
      contrastText: '#ffffff',
    },
    background: {
      default: isDark ? '#000000' : '#f5f5f7',
      paper: isDark ? '#1c1c1e' : '#ffffff',
    },
    text: {
      primary: isDark ? '#f5f5f7' : '#1d1d1f',
      secondary: isDark ? '#a1a1a6' : '#6e6e73',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "Noto Sans JP", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.045em',
      lineHeight: 1.02,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.035em',
      lineHeight: 1.08,
    },
    h3: {
      fontWeight: 650,
      letterSpacing: '-0.025em',
      lineHeight: 1.15,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.65,
    },
    button: {
      fontWeight: 650,
      letterSpacing: '-0.01em',
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: isDark
            ? 'radial-gradient(circle at 78% 5%, rgba(10,132,255,0.14), transparent 30rem)'
            : 'radial-gradient(circle at 78% 5%, rgba(0,113,227,0.10), transparent 30rem)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 999,
          paddingInline: 22,
          transition: 'transform 120ms ease-out, background-color 180ms ease, box-shadow 180ms ease',
          '&:active': {
            transform: 'scale(0.97)',
          },
          '&.Mui-focusVisible': {
            outline: `3px solid ${isDark ? 'rgba(10,132,255,0.48)' : 'rgba(0,113,227,0.32)'}`,
            outlineOffset: 3,
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: isDark ? '0 8px 24px rgba(10,132,255,0.24)' : '0 8px 24px rgba(0,113,227,0.20)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          transition: 'transform 120ms ease-out, background-color 180ms ease',
          '&:active': {
            transform: 'scale(0.94)',
          },
          '&.Mui-focusVisible': {
            outline: `3px solid ${isDark ? 'rgba(10,132,255,0.48)' : 'rgba(0,113,227,0.32)'}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const theme = useMemo(() => buildTheme(prefersDark), [prefersDark]);
  const [isRickrolled, setIsRickrolled] = useState(false);
  const revertTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(revertTimer.current), []);

  const handleAvatarClick = () => {
    window.clearTimeout(revertTimer.current);
    setIsRickrolled(true);
    revertTimer.current = window.setTimeout(() => setIsRickrolled(false), prefersReducedMotion ? 1500 : 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <Box id="top" sx={{ minHeight: '100vh' }}>
        <AppBar className="glass-surface site-header" position="sticky" elevation={0} color="transparent">
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: { xs: 0.5, sm: 1 } }}>
              <Tooltip title={isRickrolled ? 'You just got rickrolled!' : 'プロフィール'}>
                <IconButton
                  aria-label="プロフィール画像のイースターエッグを表示"
                  onClick={handleAvatarClick}
                  sx={{ mr: { xs: 0.5, sm: 1 } }}
                >
                  <Avatar
                    src={isRickrolled ? rickrollGif : '/icon.jpg'}
                    alt="yyyywaiwai"
                    sx={{
                      width: 36,
                      height: 36,
                      transition: 'opacity 180ms ease, transform 220ms cubic-bezier(.2,.8,.2,1)',
                      transform: isRickrolled && !prefersReducedMotion ? 'rotate(-4deg) scale(1.05)' : 'none',
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Typography
                component="a"
                href="#top"
                sx={{
                  color: 'text.primary',
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { xs: '0.94rem', sm: '1rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                yyyywaiwai
              </Typography>

              <Box component="nav" aria-label="メインナビゲーション" sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <Button color="inherit" href="#projects" sx={{ px: { xs: 1.25, sm: 2 }, minWidth: 0 }}>
                  Projects
                </Button>
                <Button color="inherit" href="#music" sx={{ px: { xs: 1.25, sm: 2 }, minWidth: 0 }}>
                  Music
                </Button>
              </Box>

              <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 0.5 }}>
                <Tooltip title="X を開く">
                  <IconButton
                    aria-label="X のプロフィールを新しいタブで開く"
                    component="a"
                    href="https://x.com/yyyyyy_public"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="GitHub を開く">
                  <IconButton
                    aria-label="GitHub のプロフィールを新しいタブで開く"
                    component="a"
                    href="https://github.com/yyyywaiwai"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <main id="main-content" tabIndex={-1}>
          <Introduction />
          <Projects />
          <Music />
        </main>

        <Box component="footer" sx={{ py: { xs: 5, md: 6 }, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} yyyywaiwai
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Button color="inherit" href="#top">トップへ戻る</Button>
                <IconButton
                  aria-label="X のプロフィールを新しいタブで開く"
                  component="a"
                  href="https://x.com/yyyyyy_public"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  <XIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="GitHub のプロフィールを新しいタブで開く"
                  component="a"
                  href="https://github.com/yyyywaiwai"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
