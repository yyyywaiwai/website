import React from 'react';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { Button } from '@mui/material';

const DiscordWidget: React.FC = () => (
  <Button
    variant="text"
    component="a"
    href="https://discord.com/invite/DfRhN8uFjX"
    target="_blank"
    rel="noopener noreferrer"
    startIcon={<ForumRoundedIcon />}
    aria-label="Discord コミュニティを新しいタブで開く"
    sx={{ color: 'text.primary' }}
  >
    Discord に参加
  </Button>
);

export default DiscordWidget;
