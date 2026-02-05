"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  content: string;
  icon: LucideIcon; // Lucide icon component
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false); // for SSR

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Detect client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      timelineData.forEach((item) => {
        newState[item.id] = item.id === id ? !prev[item.id] : false;
      });

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
      }

      return newState;
    });
  };

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;

    let radius = 220; // default large screen
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) radius = 120; // mobile
      else if (width < 1024) radius = 180; // tablet
    }

    const radian = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Math.max(
        0.5,
        Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
      ),
    };
  };

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative z-0 w-full min-h-screen flex flex-col items-center justify-start bg-linear-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden py-20"
    >
      {/* Heading */}
      <div className="text-center mb-16 max-w-xl px-4">
        <h2 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-cyan-300 to-teal-300">
          Our Method
        </h2>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          A systematic, science-backed wellness framework
        </p>
      </div>

      {/* Orbit */}
      <div className="relative w-full max-w-4xl h-[400px] sm:h-[480px] md:h-[520px] flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {/* Center Orb */}
          <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-linear-to-tr from-cyan-200 via-indigo-200 to-purple-200 animate-pulse flex items-center justify-center z-10 shadow-xl">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white shadow"></div>
          </div>

          {/* Orbit Path */}
          <div className="absolute w-60 sm:w-96 h-60 sm:h-96 rounded-full border border-black/20" />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const Icon: LucideIcon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node */}
                <div
                  className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-purple-300 via-cyan-200 to-teal-300 border border-black/20 shadow-md transition-all duration-300 ${
                    isExpanded
                      ? "scale-125 sm:scale-125 shadow-xl"
                      : "hover:scale-110 hover:shadow-lg"
                  }`}
                >
                  <Icon size={18} className="sm:text-black text-black/90" />
                </div>

                {/* Node Label */}
                <div className="absolute top-12 sm:top-14 text-xs sm:text-sm font-semibold text-black/70 whitespace-nowrap text-center">
                  {item.title}
                </div>

                {/* Expanded Card */}
                {isExpanded && (
                  <Card className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-52 sm:w-64 bg-white/90 backdrop-blur-md border shadow-xl rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-indigo-900 text-sm sm:text-base">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700 text-xs sm:text-sm">
                      {item.content}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
