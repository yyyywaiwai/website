import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Stack, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

const Introduction: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleScrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'background.default',
                pt: { xs: 12, md: 20 },
                pb: { xs: 10, md: 18 },
                minHeight: { xs: 'auto', md: '85vh' },
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '60%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(0, 106, 106, 0.03) 0%, transparent 60%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-10%',
                    width: '40%',
                    height: '80%',
                    background: 'radial-gradient(circle, rgba(78, 95, 125, 0.03) 0%, transparent 60%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                },
            }}
        >
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Main heading */}
                <Typography
                    component="h1"
                    variant="h1"
                    align="center"
                    color="text.primary"
                    sx={{
                        fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem', lg: '7rem' },
                        mb: 3,
                        wordBreak: 'keep-all',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.2s',
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            display: 'block',
                            fontSize: '0.35em',
                            fontWeight: 400,
                            color: 'text.secondary',
                            letterSpacing: '0.05em',
                            mb: 1,
                        }}
                    >
                        Hello, I'm
                    </Box>
                    <Box
                        component="span"
                        sx={{
                            fontWeight: 800,
                            display: 'block',
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #006a6a 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        yyyywaiwai
                    </Box>
                </Typography>

                {/* Subtitle */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        mb: 6,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.4s',
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.7,
                            fontWeight: 400,
                            fontSize: { xs: '1.1rem', md: '1.35rem' },
                            letterSpacing: '0.02em',
                            color: 'text.secondary',
                        }}
                    >
                        永遠の改造初心者
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            opacity: 0.6,
                            fontSize: '0.85rem',
                            fontStyle: 'italic',
                            mt: 1,
                        }}
                    >
                        my fuel is...
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                        <Chip
                            icon={<CodeIcon sx={{ fontSize: 14 }} />}
                            label="Swift"
                            size="small"
                            variant="filled"
                            sx={{
                                bgcolor: 'rgba(0, 106, 106, 0.08)',
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                '& .MuiChip-icon': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                        <Chip
                            icon={<MusicNoteIcon sx={{ fontSize: 14 }} />}
                            label="Mr.Children"
                            size="small"
                            variant="filled"
                            sx={{
                                bgcolor: 'rgba(0, 106, 106, 0.08)',
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                '& .MuiChip-icon': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                        <Chip
                            icon={<RamenDiningIcon sx={{ fontSize: 14 }} />}
                            label="Ramen"
                            size="small"
                            variant="filled"
                            sx={{
                                bgcolor: 'rgba(0, 106, 106, 0.08)',
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                '& .MuiChip-icon': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                    </Stack>
                </Box>

                {/* CTA Buttons */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.5s',
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleScrollToProjects}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #006a6a 0%, #005454 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #005858 0%, #004545 100%)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        プロジェクトを見る
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        href="https://x.com/yyyyyy_public"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2,
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        連絡はこちらから
                    </Button>
                </Stack>

                {/* Scroll indicator */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        mt: 10,
                        opacity: isVisible ? 0.5 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: '0.7s',
                        animation: 'bounce 2s infinite',
                        '@keyframes bounce': {
                            '0%, 20%, 50%, 80%, 100%': {
                                transform: 'translateY(0)',
                            },
                            '40%': {
                                transform: 'translateY(-10px)',
                            },
                            '60%': {
                                transform: 'translateY(-5px)',
                            },
                        },
                    }}
                >
                    <KeyboardArrowDownIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
                </Box>
            </Container>
        </Box>
    );
};

export default Introduction;
