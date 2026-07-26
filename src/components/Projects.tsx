import React from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import ambotImage from '../assets/ambot.jpg';
import iijwidgetImage from '../assets/iijwidget_gradient.jpg';
import lyricShooterImage from '../assets/lyric_shooter_original.png';
import amdlWebImage from '../assets/amdl_web.jpg';
import iMonosImage from '../assets/iMonos_compressed.png';

const projects = [
  {
    title: 'iMons',
    description: 'Twitter 保存ランキングを楽しむための iOS クライアント。いちばん使ってもらっている代表作です。',
    imageUrl: iMonosImage,
    siteUrl: 'https://imons.yyyywaiwai.com/',
    siteLabel: '公式サイトを見る',
    tags: ['iOS', 'SwiftUI'],
    featured: true,
  },
  {
    title: 'IIJWidget',
    description: 'IIJmio の残データ量をウィジェットで確認できる、ピュア SwiftUI の非公式 iOS アプリ。',
    imageUrl: iijwidgetImage,
    siteUrl: 'https://apps.apple.com/jp/app/iijwidget/id6755093444',
    siteLabel: 'App Store で見る',
    sourceUrl: 'https://github.com/yyyywaiwai/IIJWidget',
    tags: ['iOS', 'SwiftUI'],
  },
  {
    title: 'AMbot',
    description: 'Apple Music の曲をそのまま Discord で流せる音楽 Bot。',
    imageUrl: ambotImage,
    siteUrl: 'https://discord.com/oauth2/authorize?client_id=1409248906386215002',
    siteLabel: 'Bot を招待する',
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

const Projects: React.FC = () => (
  <Box
    component="section"
    id="projects"
    aria-labelledby="projects-title"
    sx={{
      scrollMarginTop: '5rem',
      py: { xs: 8, md: 16 },
    }}
  >
    <Container maxWidth="lg">
      <Reveal sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography
          id="projects-title"
          component="h2"
          variant="h2"
          sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' } }}
        >
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: '44ch' }}>
          はい、iMons もあります。でも、下も見ていってください。
        </Typography>
      </Reveal>

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        {projects.map((project, index) => (
          <Grid
            key={project.title}
            size={{ xs: 12, sm: project.featured ? 12 : 6 }}
          >
            <Reveal delay={(index % 2) * 90} sx={{ height: '100%' }}>
              <ProjectCard {...project} />
            </Reveal>
          </Grid>
        ))}
      </Grid>

      <Reveal>
        <Stack direction="row" justifyContent="center" sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography variant="body2" color="text.secondary">
            すべて個人開発・趣味プロジェクトです。
          </Typography>
        </Stack>
      </Reveal>
    </Container>
  </Box>
);

export default Projects;
