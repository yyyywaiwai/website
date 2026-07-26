import React from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import { useReveal } from '../hooks/useReveal';

type RevealProps = BoxProps & { delay?: number };

const Reveal: React.FC<RevealProps> = ({ delay = 0, className, style, children, ...rest }) => {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();

  return (
    <Box
      ref={ref}
      className={className ? `${revealClass} ${className}` : revealClass}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;
