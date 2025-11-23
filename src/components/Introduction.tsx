import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Introduction: React.FC = () => {
    const handleScrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                pt: 16, // More top padding
                pb: 12,
            }}
        >
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        mb: 4,
                        fontSize: { xs: '2.5rem', md: '3.75rem' }, // Responsive font size
                        wordBreak: 'keep-all', // Prevent awkward breaks
                        overflowWrap: 'break-word',
                    }}
                >
                    Hello,<br />I'm yyyywaiwai
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 5, maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}
                >
                    ばいぶこーだー.
                    永遠の改造初心者
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleScrollToProjects}
                    >
                        プロジェクトを見る
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        href="https://x.com/yyyyyy_public"
                    >
                        連絡はこちらから(Twitter)
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Introduction;
