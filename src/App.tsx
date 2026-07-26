import { useEffect, useMemo, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
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

const EASE_OUT = 'cubic-bezier(.2,.8,.2,1)';

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
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic UI", Meiryo, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.005em',
      lineHeight: 1.16,
      fontFeatureSettings: "'palt'",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.65,
    },
    button: {
      fontWeight: 600,
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 999,
          paddingInline: 22,
          transition: `transform 120ms ease-out, background-color 180ms ease, box-shadow 180ms ease, color 180ms ease`,
          '&:active': {
            transform: 'scale(0.97)',
          },
          '&.Mui-focusVisible': {
            outline: `3px solid ${isDark ? '#0a84ff' : '#0071e3'}`,
            outlineOffset: 3,
          },
        },
        contained: {
          boxShadow: 'none',
          ...(isDark && {
            backgroundColor: '#0071e3',
            '&:hover': {
              backgroundColor: '#0868c9',
            },
          }),
          '&:hover': {
            boxShadow: isDark ? '0 8px 24px rgba(10,132,255,0.24)' : '0 8px 24px rgba(0,113,227,0.20)',
            ...(isDark && { backgroundColor: '#0868c9' }),
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          transition: `transform 120ms ease-out, background-color 180ms ease`,
          '&:active': {
            transform: 'scale(0.94)',
          },
          '&.Mui-focusVisible': {
            outline: `3px solid ${isDark ? '#0a84ff' : '#0071e3'}`,
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

const SECTION_IDS = ['projects', 'music'] as const;

function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const theme = useMemo(() => buildTheme(prefersDark), [prefersDark]);
  const [isRickrolled, setIsRickrolled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => typeof IntersectionObserver === 'undefined');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const revertTimer = useRef<number | undefined>(undefined);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(revertTimer.current), []);

  // イースターエッグの GIF をアイドル時に先読みし、初回クリックの空白を防ぐ
  useEffect(() => {
    const preload = () => {
      const img = new Image();
      img.src = rickrollGif;
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(preload, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActiveSection(id);
          } else {
            setActiveSection((prev) => (prev === id ? null : prev));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleAvatarClick = () => {
    window.clearTimeout(revertTimer.current);
    setIsRickrolled(true);
    revertTimer.current = window.setTimeout(() => setIsRickrolled(false), prefersReducedMotion ? 1500 : 3000);
  };

  const navButtonSx = (id: string) => ({
    px: { xs: 1, sm: 2 },
    minWidth: 0,
    color: activeSection === id ? 'primary.main' : 'inherit',
    transition: `color 200ms ${EASE_OUT}`,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <Box id="top" sx={{ position: 'relative', minHeight: '100vh', overflow: 'clip' }}>
        <Box ref={sentinelRef} aria-hidden="true" sx={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '1px' }} />
        <Box className="ambient-orb ambient-orb--blue" aria-hidden="true" />
        <Box className="ambient-orb ambient-orb--soft" aria-hidden="true" />
        <AppBar
          className={isScrolled ? 'site-header is-scrolled' : 'site-header'}
          position="sticky"
          elevation={0}
          color="transparent"
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: { xs: 0.5, sm: 1 } }}>
              <Tooltip title={isRickrolled ? 'You just got rickrolled!' : '押してみて'}>
                <IconButton
                  aria-label="アバター。押すとちょっとしたお楽しみ"
                  onClick={handleAvatarClick}
                  sx={{ mr: { xs: 0.5, sm: 1 } }}
                >
                  <Avatar
                    src={isRickrolled ? rickrollGif : '/icon.jpg'}
                    alt="yyyywaiwai"
                    sx={{
                      width: 36,
                      height: 36,
                      transition: `transform 220ms ${EASE_OUT}`,
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
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                yyyywaiwai
              </Typography>

              <Box component="nav" aria-label="メインナビゲーション" sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <Button
                  color="inherit"
                  href="#projects"
                  aria-current={activeSection === 'projects' ? 'true' : undefined}
                  sx={navButtonSx('projects')}
                >
                  Projects
                </Button>
                <Button
                  color="inherit"
                  href="#music"
                  aria-current={activeSection === 'music' ? 'true' : undefined}
                  sx={navButtonSx('music')}
                >
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

        <Box
          component="footer"
          sx={{
            py: { xs: 5, md: 6 },
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
                mb: { xs: 3.5, md: 4 },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                日本から、iOS と Web と音楽。
              </Typography>
              <Stack direction="row" useFlexGap flexWrap="wrap" spacing={{ xs: 2, sm: 3 }}>
                <Link href="#projects" color="text.secondary" underline="hover" variant="body2">
                  Projects
                </Link>
                <Link href="#music" color="text.secondary" underline="hover" variant="body2">
                  Music
                </Link>
                <Link
                  href="https://discord.com/invite/DfRhN8uFjX"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="text.secondary"
                  underline="hover"
                  variant="body2"
                >
                  Discord
                </Link>
              </Stack>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 1.5,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} yyyywaiwai
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: { xs: -1, sm: 0 } }}>
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
