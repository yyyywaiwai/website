import { useEffect, useState } from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { Box, Button, Container, Skeleton, Typography } from '@mui/material';

const LAST_FM_PROFILE_URL = 'https://www.last.fm/user/yyyywaiwai';
const LAST_FM_CARD_URL = 'https://www.russ.rest/lastfm-last-played?username=yyyywaiwai&width=900';

const Music = () => {
  const [refreshKey, setRefreshKey] = useState(() => Date.now());
  const [hasLoadedLastFm, setHasLoadedLastFm] = useState(false);
  const [hasFailedLastFm, setHasFailedLastFm] = useState(false);

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        setHasFailedLastFm(false);
        setRefreshKey(Date.now());
      }
    };

    const refreshTimer = window.setInterval(refreshWhenVisible, 60_000);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, []);

  const lastFmCardUrl = `${LAST_FM_CARD_URL}&refresh=${Math.floor(refreshKey / 60_000)}`;

  return (
    <Box
      component="section"
      id="music"
      aria-labelledby="music-title"
      sx={{
        scrollMarginTop: '5rem',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 16 },
        bgcolor: 'background.default',
      }}
    >
      <Box className="music-glow" aria-hidden="true" />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          className="music-panel"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(250px, 0.72fr) minmax(0, 1.28fr)' },
            alignItems: 'center',
            gap: { xs: 5, md: 7 },
            p: { xs: 2.5, sm: 4, md: 6 },
            borderRadius: { xs: '1.75rem', md: '2.5rem' },
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#171719' : '#ffffff',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 30px 90px rgba(0,0,0,0.35)'
              : '0 30px 90px rgba(48,62,90,0.10)',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: 52,
                height: 52,
                mb: 3,
                borderRadius: '1rem',
                color: '#ffffff',
                background: 'linear-gradient(145deg, #fa4b79, #fb233b)',
                boxShadow: '0 12px 28px rgba(251,35,59,0.24)',
              }}
            >
              <MusicNoteRoundedIcon aria-hidden="true" />
            </Box>
            <Typography
              id="music-title"
              component="h2"
              variant="h2"
              sx={{ fontSize: { xs: '2.6rem', md: '3.7rem' } }}
            >
              Favorite songs
            </Typography>

            <Box
              component="a"
              href={LAST_FM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Last.fm で現在再生中または最近再生した曲を見る"
              sx={{
                position: 'relative',
                display: 'block',
                minHeight: { xs: 104, md: 88 },
                mt: 3.5,
                overflow: 'hidden',
                borderRadius: '1rem',
                bgcolor: '#151413',
                boxShadow: '0 12px 32px rgba(0,0,0,0.16)',
                transition: 'transform 160ms ease-out, box-shadow 180ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 16px 38px rgba(0,0,0,0.22)',
                },
                '&:active': { transform: 'scale(0.985)' },
                '&:focus-visible': {
                  outline: '3px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 3,
                },
              }}
            >
              {!hasLoadedLastFm && !hasFailedLastFm && (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', bgcolor: '#292522' }}
                />
              )}
              {!hasFailedLastFm && (
                <Box
                  component="img"
                  src={lastFmCardUrl}
                  alt="Last.fm の現在再生中または最近再生した曲"
                  onLoad={() => {
                    setHasLoadedLastFm(true);
                    setHasFailedLastFm(false);
                  }}
                  onError={() => setHasFailedLastFm(true)}
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    opacity: hasLoadedLastFm ? 1 : 0,
                    transition: 'opacity 220ms ease',
                  }}
                />
              )}
              {hasFailedLastFm && (
                <Box sx={{ display: 'grid', placeItems: 'center', minHeight: { xs: 104, md: 88 }, p: 2 }}>
                  <Typography variant="body2" sx={{ color: '#f5f5f7', fontWeight: 650 }}>
                    Last.fm で最近聴いた曲を見る
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              component="a"
              href={LAST_FM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              endIcon={<ArrowOutwardRoundedIcon fontSize="small" />}
              sx={{ mt: 2.5, borderColor: 'divider', color: 'text.primary' }}
            >
              Last.fm profile
            </Button>
          </Box>

          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: '1.25rem',
              bgcolor: '#fafafa',
              boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              '& iframe': { display: 'block', border: 0 },
            }}
          >
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              height="450"
              loading="lazy"
              style={{ width: '100%', maxWidth: '100%', background: 'transparent' }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/jp/playlist/favorite-songs/pl.u-0JUYxokm3b?theme=light"
              title="yyyywaiwai の Apple Music お気に入りプレイリスト"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Music;
