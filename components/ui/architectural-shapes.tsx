"use client";
import React, { FC } from "react";

interface ArchitecturalShapesProps {
    variant?: "circle" | "curve" | "rectangle" | "line" | "corner";
    size?: "sm" | "md" | "lg" | "xl";
    position?: string;
    className?: string;
    strokeWidth?: number;
    opacity?: number;
}

const sizeMap = {
    sm: { width: 80, height: 80 },
    md: { width: 160, height: 160 },
    lg: { width: 280, height: 280 },
    xl: { width: 400, height: 400 },
};

const ArchitecturalShapes: FC<ArchitecturalShapesProps> = ({
    variant = "circle",
    size = "md",
    position = "absolute",
    className = "",
    strokeWidth = 1,
    opacity = 0.15,
}) => {
    const { width, height } = sizeMap[size];
    const strokeColor = "#919191";

    const renderShape = () => {
        switch (variant) {
            case "circle":
                return (
                    <svg
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx={width / 2}
                            cy={height / 2}
                            r={width / 2 - strokeWidth}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );

            case "curve":
                return (
                    <svg
                        width={width}
                        height={height / 2}
                        viewBox={`0 0 ${width} ${height / 2}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d={`M 0 ${height / 2} Q ${width / 2} 0 ${width} ${height / 2}`}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                    </svg>
                );

            case "rectangle":
                return (
                    <svg
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x={strokeWidth / 2}
                            y={strokeWidth / 2}
                            width={width - strokeWidth}
                            height={height - strokeWidth}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );

            case "line":
                return (
                    <svg
                        width={width}
                        height={strokeWidth * 2}
                        viewBox={`0 0 ${width} ${strokeWidth * 2}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="0"
                            y1={strokeWidth}
                            x2={width}
                            y2={strokeWidth}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );

            case "corner":
                return (
                    <svg
                        width={width / 2}
                        height={height / 2}
                        viewBox={`0 0 ${width / 2} ${height / 2}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d={`M 0 0 L 0 ${height / 2} M 0 0 L ${width / 2} 0`}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                );

            default:
                return null;
        }
    };

    return (
        <div
            className={`${position} pointer-events-none ${className}`}
            style={{ opacity }}
        >
            {renderShape()}
        </div>
    );
};

// Preset combinations for common use
export const CircleDecoration: FC<{
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}> = ({ className = "", size = "lg" }) => (
    <ArchitecturalShapes
        variant="circle"
        size={size}
        className={className}
        opacity={0.1}
    />
);

export const CurveDecoration: FC<{
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}> = ({ className = "", size = "lg" }) => (
    <ArchitecturalShapes
        variant="curve"
        size={size}
        className={className}
        opacity={0.15}
    />
);

export const CornerDecoration: FC<{
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}> = ({ className = "", size = "md" }) => (
    <ArchitecturalShapes
        variant="corner"
        size={size}
        className={className}
        strokeWidth={2}
        opacity={0.2}
    />
);

ArchitecturalShapes.displayName = "ArchitecturalShapes";
export default ArchitecturalShapes;
