import React from "react";
import { GiBookmark } from "react-icons/gi";

interface TaleByYouLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  variant?: "default" | "white" | "dark";
  isNavbar?: boolean; // New prop for navbar-specific styling
}

const TaleByYouLogo: React.FC<TaleByYouLogoProps> = ({
  size = 120,
  className = "",
  showText = true,
  variant = "default",
  isNavbar = false,
}) => {
  const colors = {
    default: {
      circle: "#6366f1",
      icon: "#6366f1",
      text: "#6366f1",
    },
    white: {
      circle: "#ffffff",
      icon: "#ffffff",
      text: "#ffffff",
    },
    dark: {
      circle: "#1f2937",
      icon: "#1f2937",
      text: "#1f2937",
    },
  };

  const currentColors = colors[variant];

  // Navbar-specific sizing
  if (isNavbar) {
    const navbarIconSize = 20;
    const navbarTextSize = 16;

    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-indigo-500"
          style={{ borderColor: currentColors.circle }}
        >
          <GiBookmark
            size={navbarIconSize}
            style={{ color: currentColors.icon }}
          />
        </div>
        {showText && (
          <span
            className="font-bold text-lg"
            style={{
              color: currentColors.text,
              fontSize: `${navbarTextSize}px`,
            }}
          >
            TaleByYou
          </span>
        )}
      </div>
    );
  }

  // Regular logo for other uses
  const iconSize = size * 0.25;
  const textSize = size * 0.12;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className="drop-shadow-lg"
      >
        <defs>
          <filter
            id={`glow-${variant}`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="60"
          cy="60"
          r="57"
          fill="none"
          stroke={currentColors.circle}
          strokeWidth="3"
          filter={`url(#glow-${variant})`}
        />

        <g transform="translate(60, 45)">
          <foreignObject
            x={-iconSize / 2}
            y={-iconSize / 2}
            width={iconSize}
            height={iconSize}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                color: currentColors.icon,
              }}
            >
              <GiBookmark size={iconSize} />
            </div>
          </foreignObject>
        </g>

        {showText && (
          <text
            x="60"
            y="85"
            textAnchor="middle"
            fontSize={textSize}
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            fill={currentColors.text}
          >
            TaleByYou
          </text>
        )}
      </svg>
    </div>
  );
};

export default TaleByYouLogo;
