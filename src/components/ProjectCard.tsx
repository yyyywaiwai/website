import React from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  siteUrl?: string;
  sourceUrl?: string;
  siteLabel?: string;
  sourceLabel?: string;
  tags?: string[];
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  siteUrl,
  sourceUrl,
  siteLabel,
  sourceLabel,
  tags = [],
  featured = false,
}) => (
  <Card
    component="article"
    className="project-card"
    sx={{
      height: '100%',
      display: 'grid',
      gridTemplateColumns: featured ? { xs: '1fr', md: '1.15fr 0.85fr' } : '1fr',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: { xs: '1.5rem', md: featured ? '2rem' : '1.65rem' },
      boxShadow: 'none',
      bgcolor: 'background.default',
    }}
  >
    {imageUrl && (
      <Box className="project-media" sx={{ minHeight: featured ? { xs: 260, md: 430 } : 270 }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={`${title} のプロジェクト画像`}
          loading={featured ? 'eager' : 'lazy'}
          sx={{
            width: '100%',
            height: '100%',
            minHeight: 'inherit',
            objectFit: featured ? 'contain' : 'cover',
            p: featured ? { xs: 5, md: 8 } : 0,
            transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
          }}
        />
      </Box>
    )}

    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
        p: { xs: 3, md: featured ? 5 : 3.5 },
        '&:last-child': { pb: { xs: 3, md: featured ? 5 : 3.5 } },
      }}
    >
      <Box>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={0.75} sx={{ mb: 2.5 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 26,
                bgcolor: 'rgba(127,127,127,0.10)',
                color: 'text.secondary',
                fontSize: '0.72rem',
                fontWeight: 650,
              }}
            />
          ))}
        </Stack>
        <Typography
          component="h3"
          variant={featured ? 'h2' : 'h4'}
          sx={{
            fontWeight: 700,
            fontSize: featured ? { xs: '2.4rem', md: '3.4rem' } : { xs: '1.75rem', md: '2rem' },
            letterSpacing: '-0.035em',
          }}
        >
          {title}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mt: 1.5, maxWidth: 480, fontSize: featured ? '1.05rem' : '0.98rem', lineHeight: 1.75 }}
        >
          {description}
        </Typography>
      </Box>

      <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
        {siteUrl && (
          <Button
            variant="contained"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowOutwardRoundedIcon />}
            aria-label={`${title} の${siteLabel || 'サイト'}を新しいタブで開く`}
          >
            {siteLabel || 'サイトを開く'}
          </Button>
        )}
        {sourceUrl && (
          <Button
            variant="outlined"
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            aria-label={`${title} の${sourceLabel || 'ソースコード'}を新しいタブで開く`}
            sx={{ borderColor: 'divider', color: 'text.primary' }}
          >
            {sourceLabel || 'ソースコード'}
          </Button>
        )}
      </Stack>
    </CardContent>
  </Card>
);

export default ProjectCard;
