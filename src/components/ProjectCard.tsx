import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Box, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl?: string;
    siteUrl?: string;
    sourceUrl?: string;
    siteLabel?: string;
    sourceLabel?: string;
    tags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    imageUrl,
    siteUrl,
    sourceUrl,
    siteLabel,
    sourceLabel,
    tags
}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #006a6a 0%, #4e5f7d 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                    opacity: 1,
                },
            }}
        >
            {imageUrl && (
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            aspectRatio: '16/9',
                            objectFit: 'cover',
                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        image={imageUrl}
                        alt={title}
                    />
                    {/* Overlay gradient */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%)',
                            pointerEvents: 'none',
                        }}
                    />
                </Box>
            )}
            <CardContent sx={{ flexGrow: 1, p: 3, pb: 2 }}>
                {/* Tags */}
                {tags && tags.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                        {tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    bgcolor: 'rgba(0, 106, 106, 0.08)',
                                    color: 'primary.main',
                                    '& .MuiChip-label': {
                                        px: 1,
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                )}
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.01em',
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, gap: 0.5 }}>
                {siteUrl && (
                    <Button
                        variant="contained"
                        size="small"
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                        sx={{
                            borderRadius: 100,
                            px: 2,
                            py: 0.75,
                            fontSize: '0.8rem',
                            boxShadow: 'none',
                            background: 'linear-gradient(135deg, #006a6a 0%, #005454 100%)',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(0, 106, 106, 0.25)',
                                background: 'linear-gradient(135deg, #005858 0%, #004545 100%)',
                            },
                        }}
                    >
                        {siteLabel || 'サイトを開く'}
                    </Button>
                )}
                {sourceUrl && (
                    <Button
                        variant="outlined"
                        size="small"
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
                        sx={{
                            borderRadius: 100,
                            px: 2,
                            py: 0.75,
                            fontSize: '0.8rem',
                            borderColor: 'rgba(0, 106, 106, 0.3)',
                            color: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'rgba(0, 106, 106, 0.04)',
                            },
                        }}
                    >
                        {sourceLabel || 'ソースコード'}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProjectCard;

