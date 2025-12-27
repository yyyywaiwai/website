import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Music: React.FC = () => {
    return (
        <Box
            id="music"
            sx={{
                bgcolor: 'background.default',
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="md">
                {/* Section Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        mb: 6,
                    }}
                >
                    <MusicNoteIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        My Favorite Songs
                    </Typography>
                </Box>

                {/* Apple Music Embed */}
                <Box
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        '& iframe': {
                            display: 'block',
                            border: 'none',
                        },
                    }}
                >
                    <iframe
                        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                        height="450"
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            borderRadius: '16px',
                            background: 'transparent',
                        }}
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                        src="https://embed.music.apple.com/jp/playlist/favorite-songs/pl.u-0JUYxokm3b?theme=light"
                        title="Apple Music Playlist - Favorite Songs"
                    />
                </Box>

                {/* Optional caption */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mt: 3,
                        color: 'text.secondary',
                        opacity: 0.7,
                        fontStyle: 'italic',
                    }}
                >
                    🎵 お気に入りの曲たち
                </Typography>
            </Container>
        </Box>
    );
};

export default Music;
