"use client";
import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import animationData from "@/animations/myAnimation.json";

export default function LottieAnimation() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
            lottie.loadAnimation({
                container: container.current,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: animationData
            });
        }
    }, []);

    return <div ref={container} style={{ width: 500, height: 500 }} />;
}
