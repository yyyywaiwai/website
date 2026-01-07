import React from 'react';
import { Box, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const DiscordWidget: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 6,
            }}
        >
            <Button
                variant="contained"
                component="a"
                href="https://discord.com/invite/DfRhN8uFjX"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<ChatIcon />}
                sx={{
                    py: 2,
                    px: 4,
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    bgcolor: '#5865F2', // Discord Brand Color
                    boxShadow: '0 4px 14px 0 rgba(88, 101, 242, 0.39)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: '#4752C4',
                        boxShadow: '0 6px 20px rgba(88, 101, 242, 0.45)',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                }}
            >
                Join Discord Community
            </Button>
        </Box>
    );
};

export default DiscordWidget;
