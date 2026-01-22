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

  // Only use window if defined
  let radius = 220; // default
  if (typeof window !== "undefined") {
    radius =
      window.innerWidth < 640 ? 120 : window.innerWidth < 1024 ? 180 : 220;
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


  // Don't render orbit on server
  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="w-full min-h-screen flex flex-col items-center justify-start bg-linear-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden py-20"
    >
      {/* Heading */}
      <div className="text-center mb-16 max-w-xl px-4">
        <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-cyan-300 to-teal-300">
          Our Method
        </h2>
        <p className="text-gray-600 mt-3">
          A systematic, science-backed wellness framework
        </p>
      </div>

      {/* Orbit */}
      <div className="relative w-full max-w-4xl h-[520px] flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {/* Center Orb */}
          <div className="absolute w-20 h-20 rounded-full bg-linear-to-tr from-cyan-200 via-indigo-200 to-purple-200 animate-pulse flex items-center justify-center z-10 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-white shadow"></div>
          </div>

          {/* Orbit Path */}
          <div className="absolute w-96 h-96 rounded-full border border-black/20" />

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
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-purple-300 via-cyan-200 to-teal-300 border border-black/20 shadow-md transition-all duration-300 ${
                    isExpanded
                      ? "scale-125 shadow-xl"
                      : "hover:scale-110 hover:shadow-lg"
                  }`}
                >
                  <Icon size={20} className="text-black" />
                </div>

                {/* Node Label */}
                <div className="absolute top-14 text-sm font-semibold text-black/70 whitespace-nowrap">
                  {item.title}
                </div>

                {/* Expanded Card */}
                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-64 bg-white/90 backdrop-blur-md border shadow-xl rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-indigo-900">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-700">
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
