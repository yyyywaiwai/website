import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl?: string;
    siteUrl?: string;
    sourceUrl?: string;
    siteLabel?: string;
    sourceLabel?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    imageUrl,
    siteUrl,
    sourceUrl,
    siteLabel,
    sourceLabel
}) => {
    const buttonCount = (siteUrl ? 1 : 0) + (sourceUrl ? 1 : 0);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper', // Explicit white
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)', // Softer, larger shadow
                },
            }}
        >
            {imageUrl && (
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={title}
                />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: buttonCount === 1 ? 'center' : 'flex-start' }}>
                {siteUrl && (
                    <Button
                        size="small"
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        {siteLabel || 'サイトを開く'}
                    </Button>
                )}
                {sourceUrl && (
                    <Button
                        size="small"
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        {sourceLabel || 'ソースコード'}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProjectCard;
