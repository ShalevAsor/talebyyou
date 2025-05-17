import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipButtonProps {
  onClick?: () => void;
  tooltip: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const TooltipButton = ({
  onClick,
  tooltip,
  children,
  className = "",
  ariaLabel = "tooltip button",
}: TooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={`bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-zinc-200 transition-all cursor-pointer ${className}`}
            aria-label={ariaLabel}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
