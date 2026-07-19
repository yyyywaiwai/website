import React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import { Avatar, Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import DiscordWidget from './DiscordWidget';

const interests = [
  { label: 'Swift', icon: <CodeRoundedIcon /> },
  { label: 'Mr.Children', icon: <MusicNoteRoundedIcon /> },
  { label: 'Ramen', icon: <RamenDiningRoundedIcon /> },
];

const Introduction: React.FC = () => (
  <Box
    component="section"
    aria-labelledby="hero-title"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      pt: { xs: 8, md: 12 },
      pb: { xs: 10, md: 16 },
    }}
  >
    <Box className="ambient-orb ambient-orb--blue" aria-hidden="true" />
    <Box className="ambient-orb ambient-orb--violet" aria-hidden="true" />

    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.16fr) minmax(300px, 0.84fr)' },
          alignItems: 'center',
          gap: { xs: 7, md: 9 },
        }}
      >
        <Box className="hero-enter hero-enter--first">
          <Typography
            id="hero-title"
            component="h1"
            variant="h1"
            sx={{
              maxWidth: 760,
              fontSize: { xs: 'clamp(2.55rem, 12vw, 3.6rem)', md: 'clamp(3.8rem, 5.2vw, 4.9rem)' },
              textWrap: 'balance',
            }}
          >
            <Box component="span" sx={{ display: 'block', whiteSpace: 'nowrap' }}>iMonsの人？</Box>
            <Box component="span" sx={{ display: 'block', whiteSpace: 'nowrap' }}>いいえ、他にも</Box>
            <Box component="span" sx={{ display: 'block', whiteSpace: 'nowrap' }}>やってますよ。</Box>
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4, alignItems: { xs: 'stretch', sm: 'center' } }}>
            <Button
              variant="contained"
              size="large"
              href="#projects"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ px: 3.5 }}
            >
              プロジェクトを見る
            </Button>
            <DiscordWidget />
          </Stack>

          <Stack
            direction="row"
            useFlexGap
            flexWrap="wrap"
            spacing={1}
            aria-label="興味のある分野"
            sx={{ mt: 4 }}
          >
            {interests.map(({ label, icon }) => (
              <Chip
                key={label}
                icon={icon}
                label={label}
                variant="outlined"
                sx={{
                  height: 36,
                  borderColor: 'divider',
                  bgcolor: 'rgba(127,127,127,0.04)',
                  '& .MuiChip-icon': { color: 'text.secondary', fontSize: 17 },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box className="hero-enter hero-enter--second" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            className="glass-surface profile-card"
            sx={{
              width: '100%',
              maxWidth: 430,
              p: { xs: 2, sm: 2.5 },
              borderRadius: '2rem',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 30px 90px rgba(0,0,0,0.48)'
                : '0 30px 90px rgba(39,58,91,0.15)',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                aspectRatio: '1 / 0.94',
                overflow: 'hidden',
                borderRadius: '1.4rem',
                background: (theme) => theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, #222228, #111114)'
                  : 'linear-gradient(145deg, #ffffff, #e8f1ff)',
              }}
            >
              <Box className="portrait-ring" aria-hidden="true" />
              <Avatar
                src="/icon.jpg"
                alt="yyyywaiwai のプロフィール画像"
                sx={{
                  width: { xs: 176, sm: 216 },
                  height: { xs: 176, sm: 216 },
                  border: '8px solid',
                  borderColor: 'background.paper',
                  boxShadow: '0 20px 55px rgba(0,0,0,0.20)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: 16,
                  bottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.9,
                  borderRadius: 999,
                  bgcolor: 'rgba(20,20,22,0.78)',
                  color: '#fff',
                  backdropFilter: 'blur(16px) saturate(160%)',
                  fontSize: '0.78rem',
                  fontWeight: 650,
                  letterSpacing: '0.01em',
                }}
              >
                <Box component="span" className="status-dot status-dot--green" aria-hidden="true" />
                Building for fun
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, px: 1, pt: 2.5, pb: 0.5 }}>
              <Box>
                <Typography variant="h5" component="p" sx={{ fontWeight: 700, letterSpacing: '-0.025em' }}>
                  yyyywaiwai
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  iOS · Web · Music
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                Japan
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Introduction;
