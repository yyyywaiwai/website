import React from 'react';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { Button, Tooltip } from '@mui/material';

const DiscordWidget: React.FC = () => (
  <Tooltip title="iMons の話も雑談もこちら">
    <Button
      variant="text"
      component="a"
      href="https://discord.com/invite/DfRhN8uFjX"
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<ForumRoundedIcon />}
      aria-label="yyyywaiwai の Discord サーバーを新しいタブで開く"
      sx={{ color: 'text.primary' }}
    >
      Discord に参加
    </Button>
  </Tooltip>
);

export default DiscordWidget;
