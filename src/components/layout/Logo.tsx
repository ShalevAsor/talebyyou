import React from "react";
import { GiBookmark } from "react-icons/gi";

interface TaleByYouLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  variant?: "default" | "white" | "dark";
  isNavbar?: boolean; // New prop for navbar-specific styling
  isBanner?: boolean; // New prop for banner-specific styling
  isPackingSlip?: boolean; // New prop for packing slip styling
}

const TaleByYouLogo: React.FC<TaleByYouLogoProps> = ({
  size = 120,
  className = "",
  showText = true,
  variant = "default",
  isNavbar = false,
  isBanner = false, // New prop
  isPackingSlip = false, // New prop
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

  // Packing slip-specific styling (optimized for B&W conversion)
  if (isPackingSlip) {
    const scale = size / 120; // Base size is 120
    const packingIconSize = 35 * scale;
    const packingTextSize = 14 * scale;
    const circleSize = 70 * scale;

    return (
      <div
        className={`inline-flex flex-col items-center justify-center ${className}`}
      >
        {/* Simple circle with book icon - optimized for B&W */}
        <div
          className="flex items-center justify-center rounded-full border-4 border-black bg-white"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderWidth: `${4 * scale}px`,
          }}
        >
          <GiBookmark size={packingIconSize} style={{ color: "#000000" }} />
        </div>

        {/* Text below logo */}
        {showText && (
          <div className="mt-2 text-center">
            <div
              className="font-black leading-tight"
              style={{
                color: "#000000",
                fontSize: `${packingTextSize}px`,
                fontFamily: "Arial, sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              TaleByYou
            </div>
            <div
              className="font-medium leading-tight"
              style={{
                color: "#000000",
                fontSize: `${packingTextSize * 0.7}px`,
                fontFamily: "Arial, sans-serif",
              }}
            >
              Personalized Books
            </div>
          </div>
        )}
      </div>
    );
  }

  // Banner-specific styling for YouTube
  if (isBanner) {
    // Scale everything based on size prop
    const scale = size / 120; // Base size is 120
    const bannerIconSize = 48 * scale;
    const bannerTextSize = 32 * scale;
    const circleSize = 80 * scale;
    const gapSize = 4 * scale;

    return (
      <div
        className={`inline-flex items-center ${className}`}
        style={{ gap: `${gapSize}px` }}
      >
        {/* Banner logo container with glow effect */}
        <div className="relative">
          {/* Glow effect background */}
          <div
            className="absolute inset-0 rounded-full blur-sm opacity-30"
            style={{
              background: `linear-gradient(135deg, ${currentColors.circle}, #8b5cf6)`,
              transform: "scale(1.2)",
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          />

          {/* Main logo circle */}
          <div
            className="relative flex items-center justify-center rounded-full border-3"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              borderColor: currentColors.circle,
              borderWidth: `${3 * scale}px`,
              background: `linear-gradient(135deg, ${currentColors.circle}15, ${currentColors.circle}25)`,
              backdropFilter: "blur(10px)",
            }}
          >
            <GiBookmark
              size={bannerIconSize}
              style={{ color: currentColors.icon }}
            />
          </div>

          {/* Sparkle effects */}
          <div
            className="absolute text-yellow-300 animate-pulse"
            style={{
              top: `${-8 * scale}px`,
              right: `${-8 * scale}px`,
              fontSize: `${18 * scale}px`,
              animationDelay: "0s",
            }}
          >
            ✨
          </div>
          <div
            className="absolute text-yellow-200 animate-pulse"
            style={{
              bottom: `${-4 * scale}px`,
              left: `${-8 * scale}px`,
              fontSize: `${14 * scale}px`,
              animationDelay: "1s",
            }}
          >
            ⭐
          </div>
        </div>

        {/* Banner text with enhanced styling */}
        {showText && (
          <div className="flex flex-col">
            <span
              className="font-black tracking-tight leading-none"
              style={{
                color: currentColors.text,
                fontSize: `${bannerTextSize}px`,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              TaleByYou
            </span>
            <span
              className="font-medium opacity-90 leading-tight"
              style={{
                color: currentColors.text,
                fontSize: `${bannerTextSize * 0.4}px`,
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Make Your Child the Hero
            </span>
          </div>
        )}
      </div>
    );
  }

  // Navbar-specific sizing (unchanged)
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

  // Regular logo for other uses (unchanged)
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
