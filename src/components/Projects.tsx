import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import ambotImage from '../assets/ambot.jpg';
import iijwidgetImage from '../assets/iijwidget_gradient.png';
import lyricShooterImage from '../assets/lyric_shooter_original.png';

const projects = [
    {
        title: 'AMbot',
        description: 'Apple Music Discord Bot\ngamdlを利用したDiscordの音楽bot',
        imageUrl: ambotImage,
        siteUrl: 'https://discord.com/oauth2/authorize?client_id=1409248906386215002',
        siteLabel: '招待リンク'
    },
    {
        title: 'IIJWidget',
        description: 'IIJmioの残データ量をウィジェットで確認できる、非公式iOSアプリ。ピュアSwiftUI',
        imageUrl: iijwidgetImage,
        siteUrl: 'https://testflight.apple.com/join/9q9ja7kX',
        siteLabel: 'TestFlightリンク',
        sourceUrl: 'https://github.com/yyyywaiwai/IIJWidget',
    },
    {
        title: 'Lyric Shooter Game',
        description: '歌詞を撃つ2Dシューティングゲーム。PCのみ対応',
        imageUrl: lyricShooterImage,
        siteUrl: 'https://lyric-shooter.yyyywaiwai.com',
        sourceUrl: 'https://github.com/yyyywaiwai/lyric-shooter-game',
    },
];

const Projects: React.FC = () => {
    return (
        <Box sx={{ py: 8 }} id="projects">
            <Container maxWidth="md">
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    プロジェクト
                </Typography>
                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <ProjectCard {...project} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Projects;
