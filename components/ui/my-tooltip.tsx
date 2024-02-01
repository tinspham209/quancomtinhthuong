import React, { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface MyTooltipProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const MyTooltip: React.FC<MyTooltipProps> = ({ children, title, ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{typeof title === 'string' ? <p>{title}</p> : title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyTooltip;
