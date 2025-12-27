import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProjectCard from './ProjectCard';
import ambotImage from '../assets/ambot.jpg';
import iijwidgetImage from '../assets/iijwidget_gradient.png';
import lyricShooterImage from '../assets/lyric_shooter_original.png';
import amdlWebImage from '../assets/amdl_web.png';

const projects = [
    {
        title: 'AMbot',
        description: 'Apple Music Discord Bot\ngamdlを利用したDiscordの音楽bot',
        imageUrl: ambotImage,
        siteUrl: 'https://discord.com/oauth2/authorize?client_id=1409248906386215002',
        siteLabel: '招待リンク',
        tags: ['Discord', 'Bot'],
    },
    {
        title: 'IIJWidget',
        description: 'IIJmioの残データ量をウィジェットで確認できる、非公式iOSアプリ。ピュアSwiftUI',
        imageUrl: iijwidgetImage,
        siteUrl: 'https://apps.apple.com/jp/app/iijwidget/id6755093444',
        siteLabel: 'Appstoreリンク',
        sourceUrl: 'https://github.com/yyyywaiwai/IIJWidget',
        tags: ['iOS', 'SwiftUI'],
    },
    {
        title: 'Lyric Shooter Game',
        description: '歌詞を撃つ2Dシューティングゲーム。PCのみ対応',
        imageUrl: lyricShooterImage,
        siteUrl: 'https://lyric-shooter.yyyywaiwai.com',
        sourceUrl: 'https://github.com/yyyywaiwai/lyric-shooter-game',
        tags: ['Web', 'Game'],
    },
    {
        title: 'amdl-web',
        description: 'Apple Musicダウンローダー',
        imageUrl: amdlWebImage,
        siteUrl: 'https://amdl.yyyywaiwai.com',
        tags: ['Web', 'Tool'],
    },
];

const Projects: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Box
            ref={sectionRef}
            sx={{
                position: 'relative',
                py: { xs: 10, md: 16 },
                bgcolor: 'background.paper',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0, 106, 106, 0.2) 50%, transparent 100%)',
                },
            }}
            id="projects"
        >
            <Container maxWidth="lg">
                {/* Section Header */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: { xs: 6, md: 10 },
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        align="center"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            letterSpacing: '-0.02em',
                            color: '#191c1c',
                            mb: 2,
                        }}
                    >
                        Projects
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        align="center"
                        sx={{
                            maxWidth: 500,
                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                            lineHeight: 1.7,
                        }}
                    >
                        趣味で作っているプロジェクトたち
                    </Typography>
                </Box>

                {/* Project Cards Grid */}
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {projects.map((project, index) => (
                        <Grid
                            key={index}
                            size={{ xs: 12, sm: 6, lg: 3 }}
                            sx={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionDelay: `${0.1 + index * 0.1}s`,
                            }}
                        >
                            <ProjectCard {...project} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Projects;
