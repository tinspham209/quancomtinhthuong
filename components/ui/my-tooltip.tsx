import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface MyTooltipProps {
  title?: string;
  children: React.ReactNode;
  advancedTitle?: React.ReactNode;
}

const MyTooltip: React.FC<MyTooltipProps> = ({ children, title, advancedTitle, ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{title ? <p>{title}</p> : advancedTitle}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyTooltip;
