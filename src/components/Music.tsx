import { useEffect, useRef, useState } from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { Box, Button, Container, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Reveal from './Reveal';

const LAST_FM_PROFILE_URL = 'https://www.last.fm/user/yyyywaiwai';
const LAST_FM_CARD_URL = 'https://www.russ.rest/lastfm-last-played?username=yyyywaiwai&width=900';

const buildCardUrl = () => `${LAST_FM_CARD_URL}&refresh=${Math.floor(Date.now() / 60_000)}`;

const Music = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [cardUrl, setCardUrl] = useState(buildCardUrl);
  const [hasLoadedLastFm, setHasLoadedLastFm] = useState(false);
  const [hasFailedLastFm, setHasFailedLastFm] = useState(false);
  const [loadedEmbedTheme, setLoadedEmbedTheme] = useState<string | null>(null);
  const embedTheme = isDark ? 'dark' : 'light';
  const hasLoadedEmbed = loadedEmbedTheme === embedTheme;
  const cardUrlRef = useRef(cardUrl);

  useEffect(() => {
    cardUrlRef.current = cardUrl;
  }, [cardUrl]);

  // 60秒ごとの更新は裏で先読みし、取得に成功したときだけ差し替える
  // (表示中のカードを消してのフラッシュや、障害時のフリッカーループを防ぐ)
  useEffect(() => {
    let disposed = false;

    const refreshWhenVisible = () => {
      if (document.visibilityState !== 'visible') return;
      const next = buildCardUrl();
      if (next === cardUrlRef.current) return;
      const probe = new Image();
      probe.onload = () => {
        if (disposed) return;
        setCardUrl(next);
        setHasFailedLastFm(false);
      };
      probe.src = next;
    };

    const refreshTimer = window.setInterval(refreshWhenVisible, 60_000);
    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      disposed = true;
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, []);

  return (
    <Box
      component="section"
      id="music"
      aria-labelledby="music-title"
      sx={{
        scrollMarginTop: '5rem',
        py: { xs: 8, md: 16 },
      }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <Box
            className="music-panel"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(250px, 0.72fr) minmax(0, 1.28fr)' },
              alignItems: 'center',
              gap: { xs: 4, md: 7 },
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: { xs: '1.5rem', md: '2.5rem' },
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'var(--shadow-3)',
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                id="music-title"
                component="h2"
                variant="h2"
                sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' } }}
              >
                Music
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: '30ch' }}>
                いま聴いてる曲は Last.fm で、いつもの曲はプレイリストで。
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
                  aspectRatio: '900 / 280',
                  mt: 3.5,
                  overflow: 'hidden',
                  borderRadius: '1rem',
                  bgcolor: '#1c1c1e',
                  boxShadow: 'var(--shadow-1)',
                  transition: 'transform 160ms ease-out, box-shadow 180ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-2)',
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
                    sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', bgcolor: '#2c2c2e' }}
                  />
                )}
                {!hasFailedLastFm && (
                  <Box
                    component="img"
                    src={cardUrl}
                    alt="Last.fm の現在再生中または最近再生した曲"
                    onLoad={() => {
                      setHasLoadedLastFm(true);
                      setHasFailedLastFm(false);
                    }}
                    onError={() => setHasFailedLastFm(true)}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: hasLoadedLastFm ? 1 : 0,
                      transition: 'opacity 220ms ease',
                    }}
                  />
                )}
                {hasFailedLastFm && (
                  <Box sx={{ display: 'grid', placeItems: 'center', height: '100%', p: 2 }}>
                    <Typography variant="body2" sx={{ color: '#f5f5f7', fontWeight: 600 }}>
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
                Last.fm を見る
              </Button>
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography className="eyebrow" color="text.secondary" sx={{ mb: 1.5 }}>
                Favorite Songs
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '1rem',
                  bgcolor: isDark ? '#2c2c2e' : '#fafafa',
                  boxShadow: 'var(--shadow-1)',
                  '& iframe': { display: 'block', border: 0 },
                }}
              >
                {!hasLoadedEmbed && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{ position: 'absolute', inset: 0, height: 450, bgcolor: isDark ? '#2c2c2e' : '#ededf0' }}
                  />
                )}
                <iframe
                  key={embedTheme}
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  height="450"
                  loading="lazy"
                  onLoad={() => setLoadedEmbedTheme(embedTheme)}
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    background: 'transparent',
                    opacity: hasLoadedEmbed ? 1 : 0,
                    transition: 'opacity 220ms ease',
                  }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={`https://embed.music.apple.com/jp/playlist/favorite-songs/pl.u-0JUYxokm3b?theme=${embedTheme}`}
                  title="yyyywaiwai の Apple Music お気に入りプレイリスト"
                />
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
};

export default Music;
