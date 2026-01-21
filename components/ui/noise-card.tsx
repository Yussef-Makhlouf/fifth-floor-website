"use client";
import React, { useRef, useEffect, FC, CSSProperties } from "react";

interface NoiseCardProps {
    width?: string;
    height?: string;
    className?: string;
    animated?: boolean;
    noiseOpacity?: number;
    grainSize?: number;
    bgColor?: string;
    children?: React.ReactNode;
}

const NoiseCard: FC<NoiseCardProps> = ({
    width = "w-80",
    height = "h-80",
    className = "",
    animated = false,
    noiseOpacity = 0.08,
    grainSize = 1,
    bgColor = "bg-[#3E3E3E]",
    children,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        updateCanvasSize();

        const generateNoise = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4 * grainSize) {
                const value = Math.random() * 255;
                for (let j = 0; j < grainSize && i + j * 4 < data.length; j++) {
                    data[i + j * 4] = value;
                    data[i + j * 4 + 1] = value;
                    data[i + j * 4 + 2] = value;
                    data[i + j * 4 + 3] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };

        if (animated) {
            const animate = () => {
                generateNoise();
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animate();
        } else {
            generateNoise();
        }

        const resizeObserver = new ResizeObserver(updateCanvasSize);
        resizeObserver.observe(canvas);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            resizeObserver.disconnect();
        };
    }, [animated, grainSize]);

    const containerStyle: CSSProperties = {
        position: "relative",
        overflow: "hidden",
    };

    const noiseStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        opacity: noiseOpacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
    };

    return (
        <div
            className={`${width} ${height} ${bgColor} ${className}`}
            style={containerStyle}
        >
            <canvas ref={canvasRef} style={noiseStyle} />
            <div className="relative z-10 h-full p-6">{children}</div>
        </div>
    );
};

NoiseCard.displayName = "NoiseCard";
export default NoiseCard;
