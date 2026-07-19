import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import ProjectCard from './ProjectCard';
import ambotImage from '../assets/ambot.jpg';
import iijwidgetImage from '../assets/iijwidget_gradient.png';
import lyricShooterImage from '../assets/lyric_shooter_original.png';
import amdlWebImage from '../assets/amdl_web.png';
import iMonosImage from '../assets/iMonos_compressed.png';

const projects = [
  {
    title: 'iMons',
    description: 'Twitter 保存ランキングを楽しむための iOS クライアント。',
    imageUrl: iMonosImage,
    siteUrl: 'https://imons.yyyywaiwai.com/',
    siteLabel: '公式サイト',
    tags: ['iOS', 'SwiftUI'],
    featured: true,
  },
  {
    title: 'IIJWidget',
    description: 'IIJmio の残データ量をウィジェットで確認できる、ピュア SwiftUI の非公式 iOS アプリ。',
    imageUrl: iijwidgetImage,
    siteUrl: 'https://apps.apple.com/jp/app/iijwidget/id6755093444',
    siteLabel: 'App Store',
    sourceUrl: 'https://github.com/yyyywaiwai/IIJWidget',
    tags: ['iOS', 'SwiftUI'],
  },
  {
    title: 'AMbot',
    description: 'gamdl を利用して Apple Music を扱う Discord 音楽 Bot。',
    imageUrl: ambotImage,
    siteUrl: 'https://discord.com/oauth2/authorize?client_id=1409248906386215002',
    siteLabel: 'Bot を招待',
    tags: ['Discord', 'Bot'],
  },
  {
    title: 'Lyric Shooter',
    description: '歌詞を撃つ、PC 向けの 2D シューティングゲーム。',
    imageUrl: lyricShooterImage,
    siteUrl: 'https://lyric-shooter.yyyywaiwai.com',
    sourceUrl: 'https://github.com/yyyywaiwai/lyric-shooter-game',
    tags: ['Web', 'Game'],
  },
  {
    title: 'amdl-web',
    description: 'Apple Music のための Web ダウンローダー。',
    imageUrl: amdlWebImage,
    siteUrl: 'https://amdl.yyyywaiwai.com',
    tags: ['Web', 'Tool'],
  },
];

const Projects: React.FC = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReveal = prefersReducedMotion || isVisible;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Box
      component="section"
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title"
      sx={{
        scrollMarginTop: '5rem',
        py: { xs: 10, md: 16 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box
          className={shouldReveal ? 'reveal-section is-visible' : 'reveal-section'}
          sx={{
            mb: { xs: 5, md: 7 },
          }}
        >
          <Typography
            id="projects-title"
            component="h2"
            variant="h2"
            sx={{ fontSize: { xs: '2.7rem', md: '4.5rem' } }}
          >
            Projects
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {projects.map((project, index) => (
            <Grid
              key={project.title}
              size={{ xs: 12, md: project.featured ? 12 : 6 }}
              className={shouldReveal ? 'reveal-card is-visible' : 'reveal-card'}
              sx={{ '--reveal-delay': `${Math.min(index * 70, 280)}ms` }}
            >
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="center" sx={{ mt: { xs: 5, md: 7 } }}>
          <Typography variant="body2" color="text.secondary">
            すべて個人開発・趣味プロジェクトです。
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Projects;
