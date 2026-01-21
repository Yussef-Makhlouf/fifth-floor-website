"use client";
import React, { FC } from "react";

interface DiagonalGridProps {
    className?: string;
    gridColor?: string;
    gridSize?: number;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    opacity?: number;
}

const DiagonalGrid: FC<DiagonalGridProps> = ({
    className = "",
    gridColor = "#919191",
    gridSize = 32,
    position = "top-left",
    opacity = 0.4,
}) => {
    const getGradientPosition = () => {
        switch (position) {
            case "top-left":
                return "ellipse 80% 80% at 0% 0%";
            case "top-right":
                return "ellipse 80% 80% at 100% 0%";
            case "bottom-left":
                return "ellipse 80% 80% at 0% 100%";
            case "bottom-right":
                return "ellipse 80% 80% at 100% 100%";
            case "center":
                return "ellipse 60% 60% at 50% 50%";
            default:
                return "ellipse 80% 80% at 0% 0%";
        }
    };

    const maskGradient = `radial-gradient(${getGradientPosition()}, #000 50%, transparent 90%)`;

    return (
        <div
            className={`absolute inset-0 z-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
                backgroundSize: `${gridSize}px ${gridSize}px`,
                WebkitMaskImage: maskGradient,
                maskImage: maskGradient,
                opacity,
            }}
        />
    );
};

DiagonalGrid.displayName = "DiagonalGrid";
export default DiagonalGrid;
